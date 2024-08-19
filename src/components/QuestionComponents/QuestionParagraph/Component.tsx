import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphyPropsType, QuestionParagraphyDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraphy: FC<QuestionParagraphyPropsType> = (
    props: QuestionParagraphyPropsType
) => {
    const { text = '', isCenter = false } = { ...QuestionParagraphyDefaultProps, ...props }
    const textList = text.split('\n')

    return (
        <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0px' }}>
            {textList.map((item, index) => (
                <span key={index}>
                    {index > 0 && <br />}
                    {item}
                </span>
            ))}
        </Paragraph>
    )
}

export default QuestionParagraphy
