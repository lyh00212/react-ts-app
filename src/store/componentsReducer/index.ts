import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from 'immer'
import { ComponentPropsType } from '@/components/QuestionComponents'

export type ComponentInfoType = {
    fe_id: string // 前端生产的id，服务端MongoDB不认这种格式，所以将名称定义为了fe_id
    type: string
    title: string
    props: ComponentPropsType
}
export type ComponentsStateType = {
    selectedId: string
    componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有数据
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload
        },
        // 修改selectedId
        changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedId = action.payload
        }),
        // 添加新组件
        addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            // 获取当前中间画布选中的组件的索引值
            const { selectedId, componentList } = draft
            const index = componentList.findIndex(item => item.fe_id === selectedId)
            if (index < 0) {
                // 没有选中任何组件，新组件插入到末尾
                draft.componentList.push(newComponent)
            } else {
                // 选中某个组件，新组件插入到选中组件后面
                draft.componentList.splice(index + 1, 0, newComponent)
            }
            // 把中间画布选中项修改为当前新增加的组件
            draft.selectedId = newComponent.fe_id
        }),
        // 修改组件属性
        changeComponentProps: produce(
            (
                draft: ComponentsStateType, 
                action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>
            ) => {
                const { fe_id, newProps } = action.payload
                // 找到当前要修改属性的这个组件
                const curComp = draft.componentList.find(item => item.fe_id === fe_id)
                if (curComp) {
                    curComp.props = {
                        ...curComp.props,
                        ...newProps
                    }
                }
            }
        )
    }
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } = componentsSlice.actions
export default componentsSlice.reducer