import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '@/services/question'
import { resetComponents } from '@/store/componentsReducer'

function useLoadQuestionData() {
    const { id = '' } = useParams()
    const dispatch = useDispatch()
    // ajax加载
    const { data, loading, error, run } = useRequest(async (id: string) => {
        if (!id) throw new Error('没有问卷 id')
        const data = await getQuestionService(id)
        return data
    }, {
        manual: true,
    })
    // 根据获取的data设置 redux store
    useEffect(() => {
        if (!data) return
        const { title = '', componentList = [] } = data
        // 获取默认的 selectedId
        let selectedId = ''
        if (componentList.length > 0) {
            // 默认选中第一个组件
            selectedId = componentList[0].fe_id
        }
        // 将 componentsList 存储到 Redux store 中
        dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    }, [data])

    // 判断id变化，执行ajax加载问卷数据
    useEffect(() => {
        run(id)
    }, [id])

    return { loading, error }
}
export default useLoadQuestionData