import React, { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import EditCanvas from './EditCanvas'
import styles from './index.module.scss'

const Edit: FC = () => {
    const { loading } = useLoadQuestionData()

    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>left</div>
                    <div className={styles.main}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas loading={loading}/>
                        </div>
                    </div>
                    <div className={styles.right}>right</div>
                </div>
            </div>
        </div>
    )
}
export default Edit