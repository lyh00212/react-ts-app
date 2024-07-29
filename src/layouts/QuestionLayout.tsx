import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
    return (
        <div>
            <p>Question Layout</p>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
export default QuestionLayout