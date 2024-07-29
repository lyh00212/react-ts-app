import React, { FC } from 'react'
import { Button, Space, Divider, Tag, Popconfirm, message } from 'antd'
import { 
    EditOutlined, 
    LineChartOutlined, 
    StarOutlined, 
    CopyOutlined, 
    DeleteOutlined 
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import styles from './QuestionCard.module.scss'

type PropsType = {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const { _id, title, isPublished, isStar, answerCount, createdAt } = props
    const nav = useNavigate()

    const duplicate = () => {
        message.info('复制')
    }

    const del = () => {
        message.info('删除')
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                        <Space>
                            { isStar && <StarOutlined style={{ color: 'red'}} /> }
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        { isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
                        <span>答卷：{answerCount}</span>
                        <span>{createdAt}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: '12px 0'}} />
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    <Space>
                        <Button 
                            type='text' 
                            size='small' 
                            icon={<EditOutlined />}
                            onClick={() => nav(`/question/edit/${_id}`)}
                        >编辑问卷</Button>
                        <Button 
                            type='text' 
                            size='small' 
                            disabled={!isPublished}
                            icon={<LineChartOutlined />}
                            onClick={() => nav(`/question/stat/${_id}`)}
                        >数据统计</Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button type='text' size='small' icon={<StarOutlined />}>
                            { isStar ? '取消标星' : '标星'}
                        </Button>
                        <Popconfirm
                            title="确定复制该问卷？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={duplicate}
                        >
                            <Button type='text' size='small' icon={<CopyOutlined />}>
                                复制
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="确定删除该问卷？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={del}
                        >
                            <Button type='text' size='small' icon={<DeleteOutlined />}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard