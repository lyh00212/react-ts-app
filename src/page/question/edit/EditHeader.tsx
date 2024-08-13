import React, { FC, ChangeEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { changePageTitle } from '@/store/pageInfoReducer'
import { updateQuestionService } from '@/services/question'
import EditToolBar from './EditToolBar'
import styles from './EditHeader.module.scss'

const { Title } = Typography
// 显示和修改标题
const TitleElem: FC = () => {
    const { title } = useGetPageInfo()
    const dispatch = useDispatch()
    const [editState, setEditState] = useState(false)
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value.trim()
        if (!newTitle) return
        dispatch(changePageTitle(newTitle))
    }
    if (editState) {
        return (
            <Input
                value={title}
                onChange={handleChange}
                onPressEnter={() => setEditState(false)}
                onBlur={() => setEditState(false)}
            />
        )
    }
    return (
        <Space>
            <Title>{title}</Title>
            <Button icon={<EditOutlined />} type='text' onClick={() => setEditState(true)}></Button>
        </Space>
    )
}

// 保存按钮
const SaveButton: FC = () => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const { loading, run: save } = useRequest(
        async () => {
            if (!id) return
            await updateQuestionService(id, { ...pageInfo, componentList })
        },
        {
            manual: true
        }
    )
    // 自动保存(useDebounceEffect： 带有防抖效果的useEffect。下面代码的意思：在1s内，如果componentList或pageInfo有变化，则执行save函数)
    useDebounceEffect(() => {
        save()
    }, [componentList, pageInfo], {
        wait: 1000
    })
    // 快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
        // 取消浏览器事件默认行为（ctrl+s时，会下载页面）
        event.preventDefault()
        if (!loading) save()
    })

    return <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>保存</Button>
}

// 发布按钮
const PublishButton: FC = () => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const nav = useNavigate()
    const { loading, run: pub } = useRequest(
        async () => {
            if (!id) return
            await updateQuestionService(
                id, 
                { 
                    ...pageInfo, 
                    componentList,
                    isPublished: true // 标志着问卷已经被发布
                }
            )
        },
        {
            manual: true,
            onSuccess() {
                message.success('发布成功')
                // 发布成功，跳转到统计页面
                nav('/question/stat/' + id)
            }
        }
    )
    return <Button type='primary' onClick={pub} disabled={loading}>发布</Button>
}

// 编辑器头部
const EditHeader: FC = () => {
    const nav = useNavigate()
    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type='link' icon={<LeftOutlined />} onClick={() => nav(-1)}>
                            返回
                        </Button>
                        <TitleElem />
                    </Space>
                </div>
                <div className={styles.main}>
                    <EditToolBar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButton />
                        <PublishButton />
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default EditHeader