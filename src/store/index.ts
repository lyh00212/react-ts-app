import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from './componentsReducer'

export type StateType = {
    user: UserStateType,
    components: ComponentsStateType
}

export default configureStore({
    reducer: {
        // 模块划分
        user: userReducer,
        components: componentsReducer,
    },
})