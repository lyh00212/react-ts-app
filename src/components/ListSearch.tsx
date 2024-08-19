import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'

const { Search } = Input
const ListSearch: FC = () => {
    const [value, setValue] = useState<string>('')
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        setValue(curVal)
    }, [searchParams])
    const handleSearch = (value: string) => {
        nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
        })
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <Search
            allowClear
            placeholder="请输入关键字"
            value={value}
            onChange={handleChange}
            onSearch={handleSearch}
            style={{ width: '220px' }}
        ></Search>
    )
}
export default ListSearch
