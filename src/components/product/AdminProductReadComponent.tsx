import {useEffect,} from "react";
import {IProduct} from "../../types/product.ts";
import {getOne} from "../../apis/productAPI.ts";
import useProductModal from "../../hooks/useProductModal.ts";



function AdminProductReadComponent() {

    const { pno, product, setProduct, closeModal, changeToModify } = useProductModal()

    useEffect(() => {

        if (pno){
            getOne(pno).then((result:IProduct) => {
                setProduct(result)
            })
        }
    },[pno])




    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">제품 상세 정보</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 text-2xl"
                        aria-label="닫기"
                    >
                        x
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <img
                            src={`http://118.38.219.107:8089/api/products/view/${product.uploadFileNames}`}
                            className="w-full h-64 object-cover rounded"
                            alt={product.pname}
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-300 p-2 rounded flex flex-col items-start">
                                <span className="text-sm font-bold text-gray-700">상품명</span>
                                <span className="text-gray-900">{product.pname}</span>
                            </div>
                            <div className="border border-gray-300 p-2 rounded flex flex-col items-start">
                                <span className="text-sm font-bold text-gray-700">상품가격</span>
                                <span className="text-gray-900">{product.price}</span>
                            </div>
                        </div>
                        <div>
                            <div className="border border-gray-300 p-2 rounded flex flex-col items-start">
                                <span className="font-bold text-sm text-gray-700">상품 설명</span>
                                <span className="text-gray-900">{product.pdesc}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex space-x-2 mt-4 px-4 pb-4">
                    <button
                        className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
                        onClick={closeModal} >
                        Close
                    </button>
                    <button className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                        onClick={changeToModify} >
                        Modify
                    </button>
                </div>

            </div>
        </div>

    );
}

export default AdminProductReadComponent