import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title, desc, onChange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, desc })
    }, [title, desc])

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            layout="vertical"
            form={form}
            disabled={disabled}
            onValuesChange={handleValueChange}
            initialValues={{ title, desc }}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="描述"
                name="desc"
                rules={[{ required: true, message: '请输入段落内容' }]}
            >
                <TextArea />
            </Form.Item>
        </Form>
    )
}

export default PropComponent
