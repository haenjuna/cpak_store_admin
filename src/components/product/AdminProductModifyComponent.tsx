import React, { useEffect, useRef, useState } from 'react';
import { IProduct } from "../../types/product.ts";
import {deleteOne, getOne, putOne} from "../../apis/productAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import useProductModal from "../../hooks/useProductModal.ts";

function AdminProductModifyComponent() {
    const [loading, setLoading] = useState<boolean>(false);

    const {pno, product, setProduct, closeModal} = useProductModal()

    const filesRef = useRef<HTMLInputElement>(null);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const baseURL = "http://118.38.219.107:8089/api/products/view";

    useEffect(() => {
        setLoading(true);
        getOne(pno).then(result => {
            setProduct(result)

            // 가져온 데이터에 uploadFileNames 있는 경우 이미지 URL 생성하여 상태 업데이트
            if (result.uploadFileNames) {
                const eImageUrls = result.uploadFileNames.map(fileName => `${baseURL}/${fileName}`);
                setImageURLs(eImageUrls);
            }
            setLoading(false);
        });
    }, [pno]);


    const handleFileChange = () => {
        const files = filesRef.current?.files;
        if (files) {
            const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setImageURLs(prevUrls => [...prevUrls, ...newUrls]);
        }
    };

    // 인풋값 변경시 State 객체 value 변경 처리 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // 수정버튼 클릭 함수
    const handleModifyClick = () => {
        const formData = new FormData();
        const files = filesRef?.current?.files;

        // 신규파일 등록 처리
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }

        formData.append('pname', product.pname);
        formData.append('pdesc', product.pdesc);
        formData.append('price', product.price);

        if (product.uploadFileNames && product.uploadFileNames.length > 0) {
            for (let i = 0; i < product.uploadFileNames.length; i++) {
                formData.append('uploadFileNames', product.uploadFileNames[i]);
            }
        }

        putOne(formData, pno).then(data => {
            console.log(data);
            if (filesRef?.current?.files) {
                filesRef.current.value = '';
            }
            closeModal();
        });
    };

    // 삭제 버튼 클릭 함수
    const handleDeleteClick = () => {
        deleteOne(pno).then(() => {
            console.log('delete complete');
            closeModal();
        });
    };

    // 이미지 삭제 함수
    const handleImageDelete = (url: string) => {
        // setImageURLs 함수를 사용해, prevUrls 상태에서 삭제할 URL 제외한 URL들만 유지하는 새로운 배열로 업데이트
        setImageURLs(prevUrls => prevUrls.filter(imageUrl => imageUrl !== url));

        // URL 파일명 추출
        const fileName = url.split('/').pop();

        if (fileName) {
            // uploadFileNames null 아닌 경우에만 필터링을 수행
            // uploadFileNames 배열에서 fileName 일치하지 않는 이름만 남긴 배열로 업데이트
            setProduct(prevProduct => ({
                ...prevProduct,
                uploadFileNames: prevProduct.uploadFileNames
                    ? prevProduct.uploadFileNames.filter(name => name !== fileName)
                    : [],
            }));
        }
    };



    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {loading && <LoadingComponent />}
                <div className="flex items-center justify-between border-b" >
                    <h2 className="text-lg font-semibold mb-3">제품 수정 및 삭제</h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 text-2xl font-bold mb-3" aria-label="닫기">X</button>
                </div>
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {imageURLs.map((url, index) => (
                            <div key={url || index} className="relative flex flex-col items-center mb-4">
                                <img src={url} alt={`Product Image ${index + 1}`} className="w-32 h-32 mb-2"/>
                                <button
                                    onClick={() => handleImageDelete(url)}
                                    className="absolute top-0.5 right-0.5 bg-black text-white p-1 rounded-full"
                                    aria-label={`Delete image ${index + 1}`}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full">
                        <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">Product
                            Name</label>
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
                        <label className="block text-sm font-medium text-gray-700 pt-3">File</label>
                        <input
                            type="file"
                            ref={filesRef}
                            name="files"
                            multiple={true}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="w-full flex space-x-2 mt-4">
                        <button className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={closeModal}>Close
                        </button>
                        <button className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                                onClick={handleModifyClick}>Modify
                        </button>
                        <button
                            className="w-1/2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none"
                            onClick={handleDeleteClick}>Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProductModifyComponent;
