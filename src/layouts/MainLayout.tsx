import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from "antd";
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
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
                    <Outlet />
                </Content>
            </Layout>
            <Footer className={styles.footer}>
                问卷星&copy;2024 - percent. Created by 刘某
            </Footer>
        </Layout>
    )
}
export default MainLayout