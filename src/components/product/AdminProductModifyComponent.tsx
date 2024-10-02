import React, {useEffect, useRef, useState} from 'react';
import {initProductState, IProduct} from "../../types/product.ts";
import {getOne, putOne} from "../../apis/productAPI.ts";
import {useParams} from "react-router";

function AdminProductModifyComponent(props) {

    // 객체 상태변경 및 사용을 위한 State 처리
    const [product, setProduct] = useState<IProduct>({...initProductState});

    const {pno} = useParams()

    // 파일등록처리 반응형 객체
    const filesRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const pnoNum = Number(pno)

        getOne(pnoNum).then(result => {
            setProduct(result)
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

    // 등록버튼 클릭 함수
    const handleSubmit = () => {
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

        putOne(formData).then(data => {
            console.log(data)
            if (filesRef?.current?.files){
                filesRef.current.value = ''
            }
        })
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <img src={`http:localhost:8089/api/products/view/s_${filesRef}`} alt=""/>
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
                <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium text-gray-700">
                        File
                    </label>
                    <input type="file"
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                           value={product.uploadFileNames}
                           ref={filesRef} name='files' multiple={true}/>
                </div>
                <button
                    className="mt-4 w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none"
                    onClick={handleSubmit}
                >ADD
                </button>
            </div>
        </div>
    );
}

export default AdminProductModifyComponent;