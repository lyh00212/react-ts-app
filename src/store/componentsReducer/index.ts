import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { ComponentPropsType } from '@/components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

export type ComponentInfoType = {
    fe_id: string // 前端生产的id，服务端MongoDB不认这种格式，所以将名称定义为了fe_id
    type: string
    title: string
    isHidden?: boolean
    isLocked?: boolean
    props: ComponentPropsType
}
export type ComponentsStateType = {
    selectedId: string
    componentList: ComponentInfoType[]
    copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent: null
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
            insertNewComponent(draft, newComponent)
        }),
        // 修改组件属性
        changeComponentProps: produce(
            (
                draft: ComponentsStateType, 
                action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
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
        ),
        // 删除选中的组件
        removeSelectedComponent: produce(
            (draft: ComponentsStateType) => {
                const { componentList = [], selectedId: removeId } = draft
                // 重新计算selectedId
                const newSelectedId = getNextSelectedId(removeId, componentList)
                draft.selectedId = newSelectedId
                const index = componentList.findIndex(item => item.fe_id === removeId)
                componentList.splice(index, 1)
            }
        ),
        // 隐藏/显示 组件
        changeComponentHidden: produce(
            (
                draft: ComponentsStateType, 
                action: PayloadAction<{ fe_id: string; isHidden: boolean }>
            ) => {
                const { componentList = [], selectedId } = draft
                const { fe_id, isHidden } = action.payload
                // 重新计算selectedId
                let newSelectedId = ''
                if (isHidden) {
                    // 要隐藏
                    newSelectedId = getNextSelectedId(selectedId, componentList)
                } else {
                    // 要显示
                    newSelectedId = fe_id
                }
                draft.selectedId = newSelectedId

                const curComp = componentList.find(item => item.fe_id === fe_id)
                if (curComp) {
                    curComp.isHidden = isHidden
                }
            }
        ),
        // 锁定/解锁 组件
        toggleComponentLocked: produce(
            (
                draft: ComponentsStateType,
                action: PayloadAction<{ fe_id: string }>
            ) => {
                const { componentList = [] } = draft
                const { fe_id } = action.payload
                const curComp = componentList.find(item => item.fe_id === fe_id)
                if (curComp) {
                    curComp.isLocked = !curComp.isLocked
                }
            }
        ),
        // 拷贝当前选中的组件
        copySelectedComponent: produce(
            (draft: ComponentsStateType) => {
                const { selectedId, componentList = [] } = draft
                const selectedComponent = componentList.find(item => item.fe_id === selectedId)
                if (!selectedComponent) return
                draft.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
            }
        ),
        // 粘贴组件
        pasteCopiedComponent: produce(
            (draft: ComponentsStateType) => {
                const { copiedComponent } = draft
                if (copiedComponent === null) return
                // 要把 fe_id 给修改了
                copiedComponent.fe_id = nanoid()

                insertNewComponent(draft, copiedComponent)
            }
        ),
        // 选中上一个
        selectPrevComponent: produce(
            (draft: ComponentsStateType) => {
                const { selectedId, componentList } = draft
                const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
                // 未选中组件或选中的是最开始的组件
                if (selectedIndex < 0 || selectedIndex === 0) return
                draft.selectedId = componentList[selectedIndex - 1].fe_id
            }
        ),
        // 选中下一个
        selectNextComponent: produce(
            (draft: ComponentsStateType) => {
                const { selectedId, componentList } = draft
                const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
                // 未选中组件或选中的是最后的组件
                if (selectedIndex < 0 || selectedIndex === componentList.length - 1) return
                draft.selectedId = componentList[selectedIndex + 1].fe_id
            }
        ),
        // 修改组件标题
        changeComponentTitle: produce(
            (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
                const { fe_id, title } = action.payload

                const curComp = draft.componentList.find(item => item.fe_id === fe_id)
                if (curComp) curComp.title = title
            }
        )
    }
})

export const { 
    resetComponents, changeSelectedId, addComponent, changeComponentProps,
    removeSelectedComponent, changeComponentHidden, toggleComponentLocked,
    copySelectedComponent, pasteCopiedComponent, selectPrevComponent,
    selectNextComponent, changeComponentTitle
} = componentsSlice.actions
export default componentsSlice.reducer