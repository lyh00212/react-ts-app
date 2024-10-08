import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { Button, Space, Tooltip } from 'antd'
import {
    DeleteOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    CopyOutlined,
    BlockOutlined,
    UpOutlined,
    DownOutlined,
    UndoOutlined,
    RedoOutlined,
} from '@ant-design/icons'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import {
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked,
    copySelectedComponent,
    pasteCopiedComponent,
    moveComponent,
} from '@/store/componentsReducer'

const EditToolBar: FC = () => {
    const dispatch = useDispatch()
    const {
        selectedId,
        componentList = [],
        selectedComponent,
        copiedComponent,
    } = useGetComponentInfo()
    const { isLocked } = selectedComponent || {}

    // 判断当前选中元素是否为第一个或者最后一个
    const length = componentList.length
    const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
    const isFirst = selectedIndex === 0
    const isLast = selectedIndex > length - 1
    // 删除组件
    function handleDelete() {
        dispatch(removeSelectedComponent())
    }
    // 隐藏组件
    function handleHidden() {
        dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
    }
    // 锁定组件
    function handleLock() {
        dispatch(toggleComponentLocked({ fe_id: selectedId }))
    }
    // 复制组件
    function handleCopy() {
        dispatch(copySelectedComponent())
    }
    // 粘贴
    function handlePaste() {
        dispatch(pasteCopiedComponent())
    }
    // 上移
    function moveUp() {
        if (isFirst) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    }
    // 下移
    function moveDown() {
        if (isLast) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }
    // 撤销
    function undo() {
        dispatch(UndoActionCreators.undo())
    }
    // 重做
    function redo() {
        dispatch(UndoActionCreators.redo())
    }

    return (
        <Space>
            <Tooltip title="删除">
                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
            </Tooltip>
            <Tooltip title="隐藏">
                <Button
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    onClick={handleHidden}
                ></Button>
            </Tooltip>
            <Tooltip title="锁定">
                <Button
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'default'}
                    onClick={handleLock}
                ></Button>
            </Tooltip>
            <Tooltip title="复制">
                <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
            </Tooltip>
            <Tooltip title="粘贴">
                <Button
                    shape="circle"
                    icon={<BlockOutlined />}
                    disabled={!copiedComponent}
                    onClick={handlePaste}
                ></Button>
            </Tooltip>
            <Tooltip title="上移">
                <Button
                    shape="circle"
                    icon={<UpOutlined />}
                    disabled={isFirst}
                    onClick={moveUp}
                ></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button
                    shape="circle"
                    icon={<DownOutlined />}
                    disabled={isLast}
                    onClick={moveDown}
                ></Button>
            </Tooltip>
            <Tooltip title="撤销">
                <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
            </Tooltip>
        </Space>
    )
}

export default EditToolBar
