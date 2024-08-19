import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '@/services/stat'
import { getComponentConfByType } from '@/components/QuestionComponents/index'

const { Title } = Typography

type PropsType = {
    selectedComponentId: string
    selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
    const { selectedComponentId, selectedComponentType } = props
    const { id = '' } = useParams()
    const [stat, setStat] = useState([])

    const { run } = useRequest(
        async (questionId, componentId) => {
            const res = await getComponentStatService(questionId, componentId)
            return res
        },
        {
            manual: true,
            onSuccess(res) {
                setStat(res.stat)
            },
        }
    )

    useEffect(() => {
        if (selectedComponentId) run(id, selectedComponentId)
    }, [id, selectedComponentId])

    function genStatElem() {
        if (!selectedComponentId) return <div>未选中组件</div>
        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
        if (!StatComponent) return <div>该组件无统计列表</div>
        return <StatComponent stat={stat} />
    }

    return (
        <>
            <Title level={3}>图表统计</Title>
            <div>{genStatElem()}</div>
        </>
    )
}

export default ChartStat
