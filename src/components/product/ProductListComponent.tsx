import {getProductList} from "../../apis/productAPI.ts";
import {useEffect, useState} from "react";
import {initPageResponseState, IPageResponse, IProduct} from "../../types/product.ts";
import PageComponent from "../common/PageComponent.tsx";
import {useLocation, useSearchParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import modalState from "../../atoms/modalState.ts";
import AdminProductModalComponent from "./AdminProductModalComponent.tsx";
import LoadingComponent from "../common/LoadingComponent.tsx";

function ProductListComponent() {

    const [pageResponse, setPageResponse] = useState<IPageResponse>({...initPageResponseState})
    const [loading, setLoading] = useState<boolean>(false)
    const [query] = useSearchParams()
    const location = useLocation()

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    useEffect(() => {
        setLoading(true)
        getProductList(page,size).then(data => {
            setPageResponse(data)
            setLoading(false)
        })
    }, [query, location.key]);

    const [modal, setModal] = useRecoilState(modalState)

    const openModal = (pno: number) => {
        setModal({
            isModal: true,
            isModify: false,
            pno
        });
    };


    const ListLi = pageResponse.dtoList.map((product:IProduct)=>{

        const {pno, pname, pdesc, price, delFlag, uploadFileNames} = product

        if(delFlag) return null


        return (

            <tr key={pno}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    {/* 이미지 정보 */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img
                                className="w-full h-full rounded-full"
                                src={`http://118.38.219.107:8089/api/products/view/s_${uploadFileNames}`}/>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-gray-300">{pname}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-gray-300">{pdesc}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">{price}원</span>
                    </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => openModal(Number(pno))}
                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 border-purple-50">
                            조회
                        </button>

                    </div>
                </td>
            </tr>

        )
    })


    return (

        <div className="container mx-auto px-4 sm:px-8">
            {loading && <LoadingComponent></LoadingComponent>}
            <div className="py-8">
                <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Admin Product List Page
                </h2>
                <div className="my-2 flex sm:flex-row flex-col">
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    제품 이미지
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    상품명
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    상품 설명
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    상품 가격
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>{ListLi}</tbody>
                        </table>
                    </div>
                    <PageComponent pageResponse={pageResponse}></PageComponent>
                </div>

                {modal.isModal && <AdminProductModalComponent></AdminProductModalComponent>}
            </div>
        </div>
    )
        ;
}

export default ProductListComponent;