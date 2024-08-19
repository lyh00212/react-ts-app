import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '@/store/userReducer'

function useLoadUserData() {
    const [waitingUserData, setWaitingUserData] = useState(true)
    const dispatch = useDispatch()
    // ajax 加载用户信息
    const { run } = useRequest(getUserInfoService, {
        manual: true,
        onSuccess(result) {
            const { username, nickname } = result
            // 将信息存储到redux中
            dispatch(loginReducer({ username, nickname }))
        },
        onFinally() {
            setWaitingUserData(false)
        },
    })
    // 判断当前redux中store是否已经存在用户信息
    const { username } = useGetUserInfo()
    useEffect(() => {
        if (username) {
            // 如果redux store已经存在用户信息，就不用重新加载了
            setWaitingUserData(false)
            return
        }
        // 如果redux store中没有用户信息，则请求接口加载
        run()
    }, [username])
    return { waitingUserData }
}

export default useLoadUserData
