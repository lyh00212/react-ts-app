import React, { FC, useState } from 'react'
import cs from 'classnames/bind'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useTitle, useRequest } from 'ahooks'
import ListSearch from '@/components/ListSearch'
import ListPage from '@/components/ListPage'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionsService } from '@/services/question'
import styles from './Common.module.scss'

const classnames = cs.bind(styles)
const { Title } = Typography
const { confirm } = Modal
const Trash: FC = () => {
    useTitle('问卷星 - 回收站')

    const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
    const { list = [], total = 0 } = data
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    // 恢复
    const { run: recover } = useRequest(
        async () => {
            for await (const id of selectedIds) {
                await updateQuestionService(id, { isDeleted: false })
            }
        },
        {
            manual: true,
            debounceWait: 500,
            onSuccess() {
                message.success('恢复成功')
                refresh() // 手动刷新列表
                setSelectedIds([])
            },
        }
    )
    // 批量删除
    const { run: deleteQuestion } = useRequest(
        async () => await deleteQuestionsService(selectedIds),
        {
            manual: true,
            debounceWait: 500,
            onSuccess() {
                message.success('删除成功')
                refresh()
                setSelectedIds([])
            },
        }
    )

    const tableColumns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '是否发布',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => {
                return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
            },
        },
        {
            title: '答卷',
            dataIndex: 'answerCount',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
    ]
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedIds(selectedRowKeys as string[])
        },
    }
    const del = () => {
        confirm({
            title: '确认彻底删除该问卷？',
            icon: <ExclamationCircleOutlined />,
            content: '删除后不能找回',
            okText: '删除',
            cancelText: '取消',
            onOk: () => {
                deleteQuestion()
            },
        })
    }

    const TableElem = (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Space>
                    <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
                        恢复
                    </Button>
                    <Button danger disabled={selectedIds.length === 0} onClick={del}>
                        彻底删除
                    </Button>
                </Space>
            </div>
            <Table
                dataSource={list}
                columns={tableColumns}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                pagination={false}
                rowKey={q => q._id}
            ></Table>
        </>
    )

    return (
        <div>
            <div className={classnames('header')}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            {/* 问卷列表 */}
            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="暂无数据" />}
                {!loading && list.length > 0 && TableElem}
            </div>
            <div className={styles.footer}>
                <ListPage total={total}></ListPage>
            </div>
        </div>
    )
}
export default Trash
