import React, { FC, useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '@/constant/index'

type PropsType = {
    total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
    const [searchParams] = useSearchParams()
    const nav = useNavigate()
    const { pathname } = useLocation()
    const { total } = props
    useEffect(() => {
        const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
        const pageSize =
            parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
        setCurrent(page)
        setPageSize(pageSize)
    }, [searchParams])
    function handlePageChange(page: number, pageSize: number) {
        searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
        nav({
            pathname,
            search: searchParams.toString(),
        })
    }
    return (
        <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
        ></Pagination>
    )
}
export default ListPage
