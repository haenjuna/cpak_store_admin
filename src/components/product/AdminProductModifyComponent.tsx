import React, { useEffect, useRef, useState } from 'react';
import { initProductState, IProduct } from "../../types/product.ts";
import {deleteOne, getOne, putOne} from "../../apis/productAPI.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import modalState from "../../atoms/modalState.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";

function AdminProductModifyComponent() {
    const [product, setProduct] = useState<IProduct>({...initProductState});
    const [loading, setLoading] = useState<boolean>(false);
    const { pno } = useRecoilValue(modalState);

    const filesRef = useRef<HTMLInputElement>(null);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const setModal = useSetRecoilState(modalState);

    useEffect(() => {
        setLoading(true);
        getOne(pno).then(result => {
            setProduct(result);
            setLoading(false);

            const prevFiles: string[] = [];
            result.uploadFileNames?.forEach((fileName, index) => {
                const jsonStr = JSON.stringify({ key: fileName, value: index });
                console.log(jsonStr);
                prevFiles.push(jsonStr);
            });

            const baseURL = "http://118.38.219.107:8089/api/products/view";
            const existingImageUrls = prevFiles.map(file => {
                const { key } = JSON.parse(file);
                return `${baseURL}/${key}`;
            });
            setImageURLs(existingImageUrls);
        });
    }, [pno]);

    const handleFileChange = () => {
        const files = filesRef.current?.files;
        if (files) {
            const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setImageURLs(prevUrls => [...prevUrls, ...newUrls]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleModifyClick = () => {
        const files = filesRef?.current?.files;
        const formData: FormData = new FormData();

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }

        formData.append('pname', product.pname);
        formData.append('pdesc', product.pdesc);
        formData.append('price', product.price);

        putOne(formData, pno).then(data => {
            console.log(data);
            if (filesRef?.current?.files) {
                filesRef.current.value = '';
            }
        });
    };

    const handleDeleteClick = () => {
        deleteOne(pno).then( () => {
            console.log('delete complete');
        })
    }

    const handleImageDelete = (url: string) => {
        setImageURLs(prevUrls => prevUrls.filter(imageUrl => imageUrl !== url));
    };

    const closeModal = () => {
        setModal({ isModal: false, isModify: false, pno: 0 });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {loading && <LoadingComponent />}
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 text-2xl font-bold" aria-label="닫기">X</button>
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-3 gap-2">
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
