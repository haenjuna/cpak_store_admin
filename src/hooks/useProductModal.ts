import {useState} from "react";


const useProductModal = () => {

    const [modal, setModal] = useState<boolean>(false)

    const handleModalOpen = () => {
        setModal(true)
    }
    const handleModalClose = () => {
        setModal(false)
        console.log(modal)
    }

    return {modal, handleModalOpen, handleModalClose}

}

export default useProductModal