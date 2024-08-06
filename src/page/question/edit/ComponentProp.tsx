import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '@/components/QuestionComponents/index'
import { changeComponentProps } from '@/store/componentsReducer/index'

const NoProp: FC = () => {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>
}
const ComponentProp: FC = () => {
    const dispatch = useDispatch()
    // 当前选中组件的配置
    const { selectedComponent } = useGetComponentInfo()
    if (!selectedComponent) return <NoProp />
    const { type, props } = selectedComponent
    // 当前选中的组件类型
    const componentConf = getComponentConfByType(type)
    if (!componentConf) return <NoProp />

    function changeProps(newProps: ComponentPropsType) {
        if (!selectedComponent) return
        const { fe_id } = selectedComponent
        dispatch(changeComponentProps({ fe_id, newProps }))
    }

    const { PropComponent } = componentConf

    return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp