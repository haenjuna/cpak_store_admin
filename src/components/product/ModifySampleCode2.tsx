import React, { useEffect, useRef, useState } from 'react';
import { initProductState, IProduct } from "../../types/product.ts";
import { deleteOne, getOne, putOne } from "../../apis/productAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { useRecoilValue } from "recoil";
import modalState from "../../atoms/modalState.ts";

function ModifySampleCode2() {
    const [product, setProduct] = useState<IProduct>({...initProductState});
    const [loading, setLoading] = useState<boolean>(false);
    const [fileArr, setFileArr] = useState<string[]>([])
    const { pno } = useRecoilValue(modalState);

    const filesRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLoading(true);
        getOne(pno).then(result => {
            setProduct(result);

            setFileArr((prevFileArr) => [
                ...prevFileArr,  // 이전 상태 유지
                ...result.uploadFileNames.map((formValue) => String(formValue)) // 각 요소를 문자열로 변환하여 추가
            ]);

            setLoading(false);
        });
    }, [pno]);

    // 입력 값 변경 처리
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // 새로운 파일 추가 처리
    const handleNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFormData = new FormData();

            // 새로 추가된 파일들을 FormData에 추가
            for (let i = 0; i < files.length; i++) {
                newFormData.append('newFiles', files[i]);
            }

            // 상태에 새 파일 FormData 저장
            setProduct((prevProduct: IProduct) => ({
                ...prevProduct,
                files: newFormData,
            }));
        }
        console.log(product.files + 'fileNames : ' + product.uploadFileNames)
    };

    // 수정 버튼 클릭 시 처리
    const handleModifyClick = () => {
        const formData = new FormData();

        // 기존 파일이 있으면 처리
        if (product.files) {
            product.files.forEach((file, key) => {
                formData.append(key, file);  // 파일을 FormData로 추가
            });
        }

        // 새로운 파일이 있으면 추가
        if (filesRef?.current?.files) {
            for (let i = 0; i < filesRef.current.files.length; i++) {
                formData.append('newFiles', filesRef.current.files[i]);
            }
        }

        // 기타 데이터 추가
        formData.append('pname', product.pname);
        formData.append('pdesc', product.pdesc);
        formData.append('price', product.price);

        // 서버에 업데이트 요청
        putOne(formData, product.pno).then(() => {
            setProduct({ ...initProductState });
            if (filesRef.current) {
                filesRef.current.value = '';
            }
        });
    };

    // 삭제 버튼 클릭 시 처리
    const handleDeleteClick = () => {
        deleteOne(pno).then(() => {
            console.log('Product deleted');
        });
    };

    return (
        <div>
            {loading && <LoadingComponent />}
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="mb-4 text-3xl font-semibold text-center text-gray-700">상품 수정</h1>

                {/* 상품명 입력 */}
                <div className="w-full max-w-xs">
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

                {/* 상품 설명 입력 */}
                <div className="w-full max-w-xs">
                    <label htmlFor="ProductDesc" className="block text-sm font-medium text-gray-700">
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

                {/* 가격 입력 */}
                <div className="w-full max-w-xs">
                    <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
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

                {/* 파일 업로드 */}
                <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium text-gray-700">File</label>
                    <input
                        type="file"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ref={filesRef}
                        onChange={handleNewFiles}
                        multiple
                    />
                </div>

                {/* 수정 및 삭제 버튼 */}
                <button
                    className="mt-4 w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none"
                    onClick={handleModifyClick}
                >
                    수정 완료
                </button>
                <button
                    className="mt-4 w-1/2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none"
                    onClick={handleDeleteClick}
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

export default ModifySampleCode2;
