import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/user-token'

const instance = axios.create({
    timeout: 10 * 1000,
})
// request拦截，每次请求带上token
instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${getToken()}`
        return config
    },
    error => Promise.reject(error)
)

// response拦截，统一处理 errno 和 msg
instance.interceptors.response.use(res => {
    const response = (res.data || {}) as ResType
    const { errno, data, msg } = response
    if (errno !== 0) {
        // 错误提示
        if (msg) {
            message.error(msg)
        }
        throw new Error(msg)
    }
    // eslint-disable-next-line
    return data as any
})

export default instance

export type ResType = {
    errno: number
    data?: ResDataType
    msg?: string
}
export type ResDataType = {
    // eslint-disable-next-line
    [key: string]: any
}
