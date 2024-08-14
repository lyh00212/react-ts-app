import { configureStore } from "@reduxjs/toolkit";
// redux-undo 用于撤销重做功能
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
    user: UserStateType
    // components: ComponentsStateType
    // 增加undo
    components: StateWithHistory<ComponentsStateType>
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        // 模块划分
        user: userReducer,
        // components: componentsReducer,
        components: undoable(componentsReducer, {
            limit: 20, // 限制undo 最多为20步
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent'
            ])
        }),
        pageInfo: pageInfoReducer
    },
})