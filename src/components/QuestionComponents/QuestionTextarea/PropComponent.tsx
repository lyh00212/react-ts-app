import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionTextareaPropsType } from './interface'

const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
    const { title, placeholder, onChange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])

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
            initialValues={{ title, placeholder }}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="placeholder" name="placeholder">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default PropComponent
