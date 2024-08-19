import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import styles from './MainLayout.module.scss'
import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
    const { waitingUserData } = useLoadUserData()
    useNavPage(waitingUserData)

    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo></Logo>
                </div>
                <div className={styles.right}>
                    <UserInfo></UserInfo>
                </div>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    {waitingUserData ? (
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <Spin />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </Content>
            </Layout>
            <Footer className={styles.footer}>问卷星&copy;2024 - percent. Created by 刘某</Footer>
        </Layout>
    )
}
export default MainLayout
