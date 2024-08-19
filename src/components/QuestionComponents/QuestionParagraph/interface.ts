export type QuestionParagraphyPropsType = {
    text?: string
    isCenter?: boolean

    // 用于 PropComponent
    onChange?: (newProps: QuestionParagraphyPropsType) => void
    disabled?: boolean
}

export const QuestionParagraphyDefaultProps: QuestionParagraphyPropsType = {
    text: '一行段落',
    isCenter: false,
}
