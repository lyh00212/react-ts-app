import React, { FC } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType } from '@/components/QuestionComponents/index'
import { ComponentInfoType } from '@/store/componentsReducer'
// 临时展示input和title组件
// import QuestionTitle from '@/components/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '@/components/QuestionComponents/QuestionInput/Component'

type PropsType = {
    loading: boolean
}

// 处理从接口 api/question/:id 获取到的数据
function getComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (!componentConf) return null
    const { Component } = componentConf
    return <Component {...props} />
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
    // 从redux store中获取数据
    const { componentList } = useGetComponentInfo()
    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin />
        </div>
    }
    return (
        <div className={styles.canvas}>
            {
                componentList.map(item => {
                    const { fe_id } = item
                    
                    return <div key={fe_id} className={styles['component-wrapper']}>
                        <div className={styles.component}>
                            {getComponent(item)}
                        </div>
                    </div>
                })
            }
            {/* <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput />
                </div>
            </div> */}
        </div>
    )
}

export default EditCanvas