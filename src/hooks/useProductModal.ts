import {useRecoilValue, useSetRecoilState} from "recoil";
import modalState from "../atoms/modalState.ts";
import {useEffect, useState} from "react";
import {initProductState, IProduct} from "../types/product.ts";
import {getOne} from "../apis/productAPI.ts";


const useProductModal = () => {
    const { pno } = useRecoilValue(modalState)

    // recoil 상태 업데이트하는 함수 (모달 열고 닫고 상태 관리)
    const setModal = useSetRecoilState(modalState)

    const [product, setProduct] = useState<IProduct>({...initProductState})

    useEffect(() => {
        // const pnoNum = Number(pno)

        if (pno){
            getOne(pno).then((result:IProduct) => {
                setProduct(result)
            })
        }

    },[pno])

    // 모달 닫기
    const closeModal = () => {
        setModal({ isModal: false,isModify: false, pno: 0 });
    };
    // 수정 전환
    const changeToModify = () => {
        setModal({ isModal:true, isModify: true, pno})
    }

    return {pno, product, setProduct, closeModal, changeToModify}

}

export default useProductModal