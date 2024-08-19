import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphyDefaultProps } from './interface'

export * from './interface'

// 组件的配置
export default {
    title: '段落',
    type: 'questionParagraphy', // 前后端要统一好
    Component, // 画布显示的组件
    PropComponent, // 右侧修改属性的组件
    defaultProps: QuestionParagraphyDefaultProps,
}
