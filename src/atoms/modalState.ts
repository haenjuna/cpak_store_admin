import {atom} from "recoil";

const initialState = {
    isModal: false,
    isModify: false,
    pno : 0
}

const modalState = atom({
    key: 'modalState',
    default: initialState
})

export default modalState