import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { 
    removeSelectedComponent, copySelectedComponent,
    pasteCopiedComponent, selectPrevComponent,
    selectNextComponent
} from "@/store/componentsReducer"

// 判断光标位置
function isActiveElementValid() {
    // 获取光标的位置
    const activeElem = document.activeElement
    // 返回true表示光标不在input上
    return activeElem === document.body
}

function useBindCanvasKeyPress() {
    const dispatch = useDispatch()
    // 删除
    useKeyPress(['backspace', 'delete'], () => {
        if (!isActiveElementValid()) return
        dispatch(removeSelectedComponent())
    })
    // 复制
    useKeyPress(['ctrl.c', 'meta.c'], () => {
        if (!isActiveElementValid()) return
        dispatch(copySelectedComponent())
    })
    // 粘贴
    useKeyPress(['ctrl.v', 'meta.v'], () => {
        if (!isActiveElementValid()) return
        dispatch((pasteCopiedComponent()))
    })
    // 选中上一个
    useKeyPress('uparrow', () => {
        if (!isActiveElementValid()) return
        dispatch(selectPrevComponent())
    })
    // 选中下一个
    useKeyPress('downarrow', () => {
        if (!isActiveElementValid()) return
        dispatch(selectNextComponent())
    })
}

export default useBindCanvasKeyPress