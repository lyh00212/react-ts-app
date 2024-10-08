import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'
import { getComponentConfByType } from '@/components/QuestionComponents/index'
import { ComponentInfoType, changeSelectedId } from '@/store/componentsReducer'
import { moveComponent } from '@/store/componentsReducer/index'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'

type PropsType = {
    loading: boolean
}

// 处理从接口 api/question/:id 获取到的数据
function genComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (!componentConf) return null
    const { Component } = componentConf
    return <Component {...props} />
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
    // 从redux store中获取数据
    const { componentList, selectedId } = useGetComponentInfo()
    const dispatch = useDispatch()
    // 点击组件，选中
    function handleClick(event: MouseEvent, id: string) {
        // 阻止冒泡
        event.stopPropagation()
        dispatch(changeSelectedId(id))
    }
    // 绑定快捷键
    useBindCanvasKeyPress()

    // SortableContainer 组件的 items 属性，需要每个item都有id
    const componentListWithId = componentList.map(c => {
        return { ...c, id: c.fe_id }
    })
    // 拖拽排序结束
    function handleDragEnd(oldIndex: number, newIndex: number) {
        console.log('handleDragEnd', oldIndex, newIndex)
        dispatch(moveComponent({ oldIndex, newIndex }))
    }

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Spin />
            </div>
        )
    }
    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            <div className={styles.canvas}>
                {componentList
                    .filter(c => !c.isHidden)
                    .map(item => {
                        const { fe_id, isLocked } = item
                        // 拼接className
                        const wrapperDefaultClassName = styles['component-wrapper']
                        const selected = styles.selected
                        const lockedClassName = styles.locked
                        const wrapperClassName = classNames({
                            [wrapperDefaultClassName]: true,
                            [selected]: fe_id === selectedId,
                            [lockedClassName]: isLocked,
                        })

                        return (
                            <SortableItem key={fe_id} id={fe_id}>
                                <div
                                    className={wrapperClassName}
                                    onClick={e => handleClick(e, fe_id)}
                                >
                                    <div className={styles.component}>{genComponent(item)}</div>
                                </div>
                            </SortableItem>
                        )
                    })}
            </div>
        </SortableContainer>
    )
}

export default EditCanvas
