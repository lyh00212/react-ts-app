import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
    user: UserStateType
    components: ComponentsStateType
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        // 模块划分
        user: userReducer,
        components: componentsReducer,
        pageInfo: pageInfoReducer
    },
})