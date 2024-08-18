import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import ManageLayout from '@/layouts/ManageLayout'
import QuestionLayout from '@/layouts/QuestionLayout'
import Home from '@/page/Home'
import Login from '@/page/Login'
import NotFound from '@/page/NotFound'
import Register from '@/page/Register'  
// import Stat from '@/page/question/stat'
// import Edit from '@/page/question/edit'
import List from '@/page/manage/List'
import Star from '@/page/manage/Star'
import Trash from '@/page/manage/Trash'

const Edit = lazy(() => import('@/page/question/edit'))
const Stat = lazy(() => import('@/page/question/stat'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'manage',
                element: <ManageLayout />,
                children: [
                    {
                        path: 'list',
                        element: <List />
                    },
                    {
                        path: 'star',
                        element: <Star />
                    },
                    {
                        path: 'trash',
                        element: <Trash />
                    }
                ]
            },
            {
                path: '*',
                element: <NotFound />
            },
        ]
    },
    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            {
                path: 'edit/:id',
                element: <Edit />
            },
            {
                path: 'stat/:id',
                element: <Stat />
            }
        ]
    },
])

export default router

// 常用的路由常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
    if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
    return false
}

export function isNoNeedUserInfo(pathname: string) {
    if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
    return false
}
