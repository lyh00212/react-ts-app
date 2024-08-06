import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// 组件的配置
export default {
    title: '输入框',
    type: 'questionInput', // 前后端要统一好
    Component, // 画布显示的组件
    PropComponent, // 右侧修改属性的组件
    defaultProps: QuestionInputDefaultProps
}