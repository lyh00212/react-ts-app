import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import { componentConfGroup, ComponentConfType } from '@/components/QuestionComponents/index'
import { addComponent } from '@/store/componentsReducer'
import styles from './ComponentLib.module.scss'

const { Title } = Typography
function genComponent(value: ComponentConfType) {
    const { title, type, Component, defaultProps } = value
    // eslint-disable-next-line
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(
            addComponent({
                fe_id: nanoid(),
                title,
                type,
                props: defaultProps,
            })
        )
    }
    return (
        <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    )
}
const Lib: FC = () => {
    return (
        <>
            {componentConfGroup.map((group, index) => {
                const { groupId, groupName, components } = group
                return (
                    <div key={groupId}>
                        <Title
                            level={3}
                            style={{
                                fontSize: '16px',
                                marginTop: index > 0 ? '20px' : '0',
                            }}
                        >
                            {groupName}
                        </Title>
                        <div>{components.map(v => genComponent(v))}</div>
                    </div>
                )
            })}
        </>
    )
}

export default Lib
