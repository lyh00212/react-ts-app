import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// 组件的配置
export default {
    title: '标题',
    type: 'questionTitle', // 前后端要统一好
    Component,
    defaultProps: QuestionTitleDefaultProps
}