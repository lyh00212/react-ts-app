import React, { FC, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import cs from 'classnames/bind'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import { getQuestionListService } from '@/services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constant/index'
import styles from './Common.module.scss'


const classnames = cs.bind(styles)
const { Title } = Typography
const List: FC = () => {
    // useTitle - 修改浏览器标签的文字
    useTitle('问卷星-我的问卷')

    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [searchParams] = useSearchParams()
    const haveMoreData = total > list.length

    const { run: load, loading } = useRequest(async () => {
        const data = await getQuestionListService({
            page,
            pageSize: LIST_PAGE_SIZE,
            keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
        })
        return data
    },
    {
        manual: true,
        onSuccess: (result) => {
            const { list: l = [], total = 0 } = result
            setList(list.concat(l))
            setTotal(total)
            setPage(page + 1)
        }
    })

    const containerRef = useRef<HTMLDivElement>(null)
    // 为 tryLoadMore 函数设置防抖
    const { run: tryLoadMore } = useDebounceFn(
        () => {
            const elem = containerRef.current
            if (elem === null) return
            const domRect = elem.getBoundingClientRect()
            if (domRect === null) return
            const { bottom } = domRect
            if (bottom <= document.body.clientHeight) {
                load()
            }
        },
        {
            wait: 1000,
        }
    )

    // 1.当页面加载 或者 url参数（keyword）变化时，触发加载
    useEffect(() => {
        tryLoadMore()
    }, [searchParams])

    // 2.当页面滚动时，触发加载
    useEffect(() => {
        if (haveMoreData) {
            window.addEventListener('scroll', tryLoadMore)
        }

        return () => {
            window.removeEventListener('scroll', tryLoadMore)
        }
    }, [searchParams, haveMoreData])

    return (
        <div>
            <div className={classnames('header')}>
                <div className={styles.left}>
                    <Title level={3}>我的问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch></ListSearch>
                </div>
            </div>
            {/* 问卷列表 */}
            <div className={styles.content}>
                { loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                ) }
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
            {JSON.stringify(haveMoreData)}------
                <div ref={containerRef}>
                    LoadMore... 上划加载更多...
                </div>
            </div>
        </div>
    )
}

export default List