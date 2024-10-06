import React, {useEffect, useRef, useState} from 'react';
import {initProductState, IProduct} from "../../types/product.ts";
import {deleteOne, getOne, putOne} from "../../apis/productAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import {useRecoilValue, useSetRecoilState} from "recoil";
import modalState from "../../atoms/modalState.ts";

function AdminProductModifyComponent() {

    // 객체 상태변경 및 사용을 위한 State 처리
    const [product, setProduct] = useState<IProduct>({...initProductState});
    const [loading, setLoading] = useState<boolean>(false)
    const { pno } = useRecoilValue(modalState)

    // 파일등록처리 반응형 객체
    const filesRef = useRef<HTMLInputElement>(null);

    // recoil 상태 업데이트하는 함수 (모달 열고 닫고 상태 관리)
    const setModal = useSetRecoilState(modalState)

    useEffect(() => {
        setLoading(true)
        getOne(pno).then(result => {
            setProduct(result)
            setLoading(false)
        })
    },[pno])

    // 인풋값 변경시 State 객체 value 변경 처리 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;

        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // 수정버튼 클릭 함수
    const handleModifyClick = () => {
        const files = filesRef?.current?.files;
        const formData:FormData = new FormData();

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }//end for
        }// end if

        formData.append('pname',product.pname)
        formData.append('pdesc',product.pdesc)
        formData.append('price',product.price)

        console.log(formData)
        putOne(formData, pno).then(data => {
            console.log(data)
            if (filesRef?.current?.files){
                filesRef.current.value = ''
            }
        })
    }

    // 삭제 버튼 클릭 함수
    const handleDeleteClick = () => {

        deleteOne(pno).then( () => {
            console.log('delete complete')
        })
    }

    // 모달 닫기
    const closeModal = () => {
        setModal({ isModal: false,isModify: false, pno: 0 });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {loading && <LoadingComponent/>}
                <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 text-2xl font-bold"
                    aria-label="닫기"
                >
                    X
                </button>
                <div className="flex flex-col items-center">
                    <img src={`http://118.38.219.107:8089/api/products/view/${filesRef}`} alt="Product"
                         className="w-32 h-32 mb-4"/>
                    <div className="w-full">
                        <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="ProductName"
                            name="pname"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={product.pname}
                            placeholder="Enter The Product Name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="ProductDesc" className="block text-sm font-medium text-gray-700 pt-3">
                            Product Description
                        </label>
                        <input
                            type="text"
                            id="ProductDesc"
                            name="pdesc"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={product.pdesc}
                            placeholder="Enter The Product DESC"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="Price" className="block text-sm font-medium text-gray-700 pt-3">
                            Price
                        </label>
                        <input
                            type="text"
                            id="Price"
                            name="price"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={product.price}
                            placeholder="Enter The Product Price"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 pt-3">
                            File
                        </label>
                        <input type="file"
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                               ref={filesRef} name='files' multiple={true}/>
                    </div>
                    <div className="w-full flex space-x-2 mt-4">
                        <button
                            className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                            onClick={closeModal}
                        >Close
                        </button>
                        <button
                            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none"
                            onClick={handleModifyClick}
                        >Modify
                        </button>
                        <button
                            className="w-1/2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none"
                            onClick={handleDeleteClick}
                        >Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProductModifyComponent;