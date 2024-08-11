import React, { FC, useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import ComponentProp from './ComponentProp'
import PageSetting from './pageSetting'

// TS 枚举
enum TAB_KEYS {
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting'
}

const RightPanel: FC = () => {
    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const { selectedId } = useGetComponentInfo()
    useEffect(() => {
        if (selectedId) {
            setActiveKey(TAB_KEYS.PROP_KEY)
        } else {
            setActiveKey(TAB_KEYS.SETTING_KEY)
        }
    }, [selectedId])

    function changeTabs(key: string) {
        setActiveKey(key as TAB_KEYS)
    }
    const tabsItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <PageSetting />
        },
    ]
    return <Tabs activeKey={activeKey} items={tabsItems} onChange={changeTabs}></Tabs>
}

export default RightPanel