import {useEffect, useState} from "react";
import {initProductState, IProduct} from "../../types/product.ts";
import {getOne} from "../../apis/productAPI.ts";
import {useRecoilValue, useSetRecoilState} from "recoil";
import modalState from "../../atoms/modalState.ts";



function AdminProductReadComponent() {

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">제품 상세 정보</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 text-2xl font-bold"
                        aria-label="닫기"
                    >
                        X
                    </button>
                </div>
                <div className="p-6">
                    <div>
                        <img src={`http://118.38.219.107:8089/api/products/view/s_${product.uploadFileNames}`} alt=""/>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="border-black border w-full flex gap-2 align-items-center">
                                <span className="text-sm font-medium text-gray-700">상품명</span>
                                <span className="font-bold">{product.pname}</span>
                            </div>
                            <div className="border-black border w-full flex gap-2 align-items-center">
                                <span className="text-sm font-medium text-gray-700">상품가격</span>
                                <span className="font-bold">{product.price}</span>
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-700">상품 설명</span>
                            <p className="mt-1 w-full px-3 py-2  sm:text-sm">
                                {product.pdesc}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 px-6 py-3 bg-gray-50">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        닫기
                    </button>
                    <button
                        onClick={changeToModify}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProductReadComponent