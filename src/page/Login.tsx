import React, { FC, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useNavigate, Link } from 'react-router-dom'
import { 
    Space, Typography, Form, 
    Button, Input, Checkbox, message 
} from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { REGISTER, MANAGE_INDEX_PATHNAME } from '@/router/index'
import { loginService } from '@/services/user'
import { setToken } from '@/utils/user-token'

const { Title } = Typography
const USERNAME_KEY = "username"
const PASSWORD_KEY = "password"
const rememberUser = (username: string, password: string) => {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
}
const deleteUserFromStorage = () => {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}
const getUserInfoFromStorage = () => {
    const username = localStorage.getItem(USERNAME_KEY)
    const password = localStorage.getItem(PASSWORD_KEY)
    return { username, password }
}
const Login: FC = () => {
    const nav = useNavigate()
    const [form] = Form.useForm()
    const { run } = useRequest(
        async (userName: string, password: string) => {
            const data = await loginService(userName, password)
            return data
        }, {
            manual: true,
            onSuccess(result) {
                const { token = '' } = result
                setToken(token)
                message.success('登录成功')
                nav(MANAGE_INDEX_PATHNAME)
            }
        }
    )
    useEffect(() => {
        const { username, password } = getUserInfoFromStorage()
        form.setFieldsValue({ username, password })
    }, [])

    const onFinish = (values: any) => {
        console.log(values)
        const { username, password, remember } = values
        run(username, password)
        if (remember) {
            rememberUser(username, password)
        } else {
            deleteUserFromStorage()
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>用户登录</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item 
                        label="用户名" 
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
                            { pattern: /^\w+$/, message: '只能是字母数字下划线' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="密码" 
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item 
                        name="remember"
                        wrapperCol={{ offset: 7, span: 16 }}
                        valuePropName="checked"
                    >
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Link to={REGISTER}>注册新用户</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login