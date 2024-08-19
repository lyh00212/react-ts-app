import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { QuestionCheckboxPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const { title, isVertical, list = [], onChange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, list })
    }, [title, isVertical, list])

    function handleValuesChange() {
        if (!onChange) return
        const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
        if (newValues.list) {
            newValues.list = newValues.list.filter(
                item => !(item.text === null || item.text === undefined)
            )
        }
        const { list = [] } = newValues
        list.forEach(opt => {
            if (!opt.value) {
                // 新增的表单没有value值，需要在这里添加
                opt.value = nanoid(5)
            }
        })
        onChange(newValues)
    }

    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{ title, isVertical, list }}
            disabled={disabled}
            onValuesChange={handleValuesChange}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="选项">
                <Form.List name="list">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name }, index) => {
                                return (
                                    <Space key={key} align="baseline">
                                        {/* 当前选项 - 是否选中 */}
                                        <Form.Item name={[name, 'checked']} valuePropName="checked">
                                            <Checkbox />
                                        </Form.Item>
                                        {/* 当前选项 - 输入框 */}
                                        <Form.Item
                                            name={[name, 'text']}
                                            rules={[
                                                { required: true, message: '请输入选项内容' },
                                                {
                                                    validator: (_, text) => {
                                                        const { list = [] } = form.getFieldsValue()
                                                        let num = 0
                                                        list.map((opt: OptionType) => {
                                                            if (opt.text === text) num++ // 记录text相同的个数，num只能为1
                                                        })
                                                        return num === 1
                                                            ? Promise.resolve()
                                                            : Promise.reject(
                                                                  new Error('和其他选项重复了')
                                                              )
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input placeholder="请输入选项文字..." />
                                        </Form.Item>
                                        {/* 当前选项 - 删除按钮 */}
                                        {index > 0 && (
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        )}
                                    </Space>
                                )
                            })}
                            <Form.Item>
                                <Button
                                    type="link"
                                    block
                                    onClick={() => add({ text: '', value: '', checked: false })}
                                    icon={<PlusOutlined />}
                                >
                                    添加选项
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent
