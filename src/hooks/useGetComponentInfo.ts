import { useSelector } from "react-redux";
import { StateType } from '@/store'
import { ComponentsStateType } from '@/store/componentsReducer'

function useGetComponentInfo() {
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType
    const { componentList = [], selectedId, copiedComponent } = components
    // 中间画布中当前选中项的信息
    const selectedComponent = componentList.find(item => item.fe_id === selectedId)

    return {
        componentList,
        selectedId,
        selectedComponent,
        copiedComponent
    }
}

export default useGetComponentInfo