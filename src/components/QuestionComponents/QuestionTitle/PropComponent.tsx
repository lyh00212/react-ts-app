import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { text, level, isCenter, onChange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ text, level, isCenter })
    }, [text, level, isCenter])

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            layout='vertical'
            form={form}
            disabled={disabled}
            onValuesChange={handleValueChange}
            initialValues={{ text, level, isCenter }}
        >
            <Form.Item 
                label='标题内容' 
                name='text' 
                rules={[{ required: true, message: '请输入标题内容' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label='层级' name='level'>
                <Select
                    options={[
                        { value: 1, text: 1 },
                        { value: 2, text: 2 },
                        { value: 3, text: 3 },
                    ]}
                ></Select>
            </Form.Item>
            {/* valuePropName：checkbox没有value属性，只有checked属性，所以需要使用valuePropName指定表单取值的字段 */}
            <Form.Item name='isCenter' valuePropName='checked'>
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent