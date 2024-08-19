import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取下一个selectedId
 * @param fe_id 当前选中的id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
    const visibleComponentList = componentList.filter(item => !item.isHidden)
    const index = visibleComponentList.findIndex(item => item.fe_id === fe_id)
    if (index < 0) return ''

    // 重新计算 selectedId
    let newSelectedId = ''
    const length = visibleComponentList.length
    if (length <= 1) {
        // 组件长度就一个，删除了就没有组件可以选中了
        newSelectedId = ''
    } else {
        if (index + 1 === length) {
            // 要删除最后一个，就要选中上一个
            newSelectedId = visibleComponentList[index - 1].fe_id
        } else {
            // 要删除的不是最后一个，删除以后选中下一个
            newSelectedId = visibleComponentList[index + 1].fe_id
        }
    }
    return newSelectedId
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
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
}
