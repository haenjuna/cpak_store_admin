import {useRecoilValue, useSetRecoilState} from 'recoil';
import modalState from "../../atoms/modalState.ts";
import {useEffect, useState} from "react";
import {initProductState, IProduct} from "../../types/product.ts";
import {getOne} from "../../apis/productAPI.ts";

function AdminProductModalComponent() {

    const { pno } = useRecoilValue(modalState)

    // recoil 상태 업데이트하는 함수 (모달 열고 닫고 상태 관리)
    const setModal = useSetRecoilState(modalState)

    const [product, setProduct] = useState<IProduct>({...initProductState})

    useEffect(() => {
        const pnoNum = Number(pno)

        if (pnoNum){
            getOne(pnoNum).then((result:IProduct) => {
                console.log(result)
                setProduct(result)
            })
        }
    },[pno])

    // 모달 닫기
    const closeModal = () => {
        setModal({ isModal: false, pno: 0 });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">제품 상세 정보</h2>
                    <button
                        onClick={closeModal}  // 모달 닫기 버튼
                        className="text-gray-400 hover:text-gray-500 text-2xl font-bold"
                        aria-label="닫기"
                    >
                        X
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <img
                            src={`http://localhost:8089/api/products/view/${product.uploadFileNames}`}
                            className="w-full h-48 object-cover rounded"
                            alt={product.pname}
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">상품명</label>
                            <input
                                type="text"
                                readOnly
                                value={product.pname}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">상품 설명</label>
                            <textarea
                                readOnly
                                value={product.pdesc}
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">상품 가격</label>
                            <input
                                type="text"
                                readOnly
                                value={`${product.price}원`}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            />
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
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProductModalComponent;
