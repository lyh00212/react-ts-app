import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { changeSelectedId } from '@/store/componentsReducer'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import styles from './index.module.scss'

const Edit: FC = () => {
    const { loading } = useLoadQuestionData()
    const dispatch = useDispatch()
    // 修改标题
    const { title } = useGetPageInfo()
    useTitle(`编辑问卷 - ${title}`)

    function clearSelectedId() {
        dispatch(changeSelectedId(''))
    }

    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: '#fff', height: '40px' }}>
                <EditHeader />
            </div>
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel />
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas loading={loading} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit
