import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

// 组件的配置
export default {
    title: '问卷描述',
    type: 'questionInfo', // 前后端要统一好
    Component, // 画布显示的组件
    PropComponent, // 右侧修改属性的组件
    defaultProps: QuestionInfoDefaultProps,
}
