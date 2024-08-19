import React, { FC } from 'react'
// import { useRequest } from 'ahooks'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '@/router/index'
// import { getUserInfoService } from '@/services/user'
import { removeToken } from '@/utils/user-token'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { logoutReducer } from '@/store/userReducer'

const UserInfo: FC = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    // const { data } = useRequest(getUserInfoService)
    // const { username, nickname } = data || {}
    const { username, nickname } = useGetUserInfo()
    const logout = () => {
        dispatch(logoutReducer()) // 清空redux中user的数据
        removeToken()
        message.success('退出成功')
        nav(LOGIN_PATHNAME)
    }
    const UserInfo = (
        <>
            <span style={{ color: '#e8e8e8' }}>
                <UserOutlined />
                {nickname}
            </span>
            <Button type="link" onClick={logout}>
                退出
            </Button>
        </>
    )
    const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
    return <div>{username ? UserInfo : Login}</div>
}
export default UserInfo
