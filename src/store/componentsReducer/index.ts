import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
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
    copiedComponent: null,
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有数据
        resetComponents: (
            state: ComponentsStateType,
            action: PayloadAction<ComponentsStateType>
        ) => {
            return action.payload
        },
        // 修改selectedId
        changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        // 添加新组件
        addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            insertNewComponent(state, newComponent)
        },
        // 修改组件属性
        changeComponentProps: (
            state: ComponentsStateType,
            action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
        ) => {
            const { fe_id, newProps } = action.payload
            // 找到当前要修改属性的这个组件
            const curComp = state.componentList.find(item => item.fe_id === fe_id)
            if (curComp) {
                curComp.props = {
                    ...curComp.props,
                    ...newProps,
                }
            }
        },
        // 删除选中的组件
        removeSelectedComponent: (state: ComponentsStateType) => {
            const { componentList = [], selectedId: removeId } = state
            // 重新计算selectedId
            const newSelectedId = getNextSelectedId(removeId, componentList)
            state.selectedId = newSelectedId
            const index = componentList.findIndex(item => item.fe_id === removeId)
            componentList.splice(index, 1)
        },
        // 隐藏/显示 组件
        changeComponentHidden: (
            state: ComponentsStateType,
            action: PayloadAction<{ fe_id: string; isHidden: boolean }>
        ) => {
            const { componentList = [], selectedId } = state
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
            state.selectedId = newSelectedId

            const curComp = componentList.find(item => item.fe_id === fe_id)
            if (curComp) {
                curComp.isHidden = isHidden
            }
        },
        // 锁定/解锁 组件
        toggleComponentLocked: (
            state: ComponentsStateType,
            action: PayloadAction<{ fe_id: string }>
        ) => {
            const { componentList = [] } = state
            const { fe_id } = action.payload
            const curComp = componentList.find(item => item.fe_id === fe_id)
            if (curComp) {
                curComp.isLocked = !curComp.isLocked
            }
        },
        // 拷贝当前选中的组件
        copySelectedComponent: (state: ComponentsStateType) => {
            const { selectedId, componentList = [] } = state
            const selectedComponent = componentList.find(item => item.fe_id === selectedId)
            if (!selectedComponent) return
            state.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
        },
        // 粘贴组件
        pasteCopiedComponent: (state: ComponentsStateType) => {
            const { copiedComponent } = state
            if (copiedComponent === null) return
            // 要把 fe_id 给修改了
            copiedComponent.fe_id = nanoid()

            insertNewComponent(state, copiedComponent)
        },
        // 选中上一个
        selectPrevComponent: (state: ComponentsStateType) => {
            const { selectedId, componentList } = state
            const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
            // 未选中组件或选中的是最开始的组件
            if (selectedIndex < 0 || selectedIndex === 0) return
            state.selectedId = componentList[selectedIndex - 1].fe_id
        },
        // 选中下一个
        selectNextComponent: (state: ComponentsStateType) => {
            const { selectedId, componentList } = state
            const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
            // 未选中组件或选中的是最后的组件
            if (selectedIndex < 0 || selectedIndex === componentList.length - 1) return
            state.selectedId = componentList[selectedIndex + 1].fe_id
        },
        // 修改组件标题
        changeComponentTitle: (
            state: ComponentsStateType,
            action: PayloadAction<{ fe_id: string; title: string }>
        ) => {
            const { fe_id, title } = action.payload
            const curComp = state.componentList.find(item => item.fe_id === fe_id)
            if (curComp) curComp.title = title
        },
        // 移动组件位置
        moveComponent: (
            state: ComponentsStateType,
            action: PayloadAction<{ oldIndex: number; newIndex: number }>
        ) => {
            const { oldIndex, newIndex } = action.payload
            const { componentList: curComponentList } = state
            // 使用dnd-kit的arrayMove方法改变元素位置
            state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
        },
    },
})

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent,
    changeComponentTitle,
    moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
