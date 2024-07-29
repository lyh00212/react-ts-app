import React, { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
    const { loading, data } = useLoadQuestionData()

    return (
        <div>
            <p>Edit page</p>
            {loading ? <p>加载中</p> : <p>{JSON.stringify(data)}</p>}
        </div>
    )
}
export default Edit