import React, { FC } from 'react'
import cs from 'classnames/bind'
import { Typography, Empty, Spin } from 'antd'
import { useTitle } from 'ahooks'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import ListPage from '@/components/ListPage'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import styles from './Common.module.scss'


const classnames = cs.bind(styles)
const { Title } = Typography
const List: FC = () => {
    useTitle("问卷星 - 星标问卷")

    const { data = {}, loading } = useLoadQuestionListData()
    const { list = [], total = 0 } = data

    return (
        <div>
            <div className={classnames('header')}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            {/* 问卷列表 */}
            <div className={styles.content}>
                { loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                ) }
                { !loading && list.length === 0 && <Empty description="暂无数据" /> }
                {
                    !loading && 
                    list.length > 0 && 
                    list.map((item: any) => {
                        const { _id } = item
                        return <QuestionCard key={_id} {...item} />
                    })
                }
            </div>
            <div className={styles.footer}>
                <ListPage
                    total={total}
                >
                </ListPage>
            </div>
        </div>
    )
}
export default List