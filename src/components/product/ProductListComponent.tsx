import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getProductList } from "../../apis/productAPI.ts";
import { initPageResponseState, IPageResponse, IProduct } from "../../types/product.ts";
import PageComponent from "../common/PageComponent.tsx";
import { useRecoilState } from "recoil";
import modalState from "../../atoms/modalState.ts";
import AdminProductModalComponent from "./AdminProductModalComponent.tsx";
import LoadingComponent from "../common/LoadingComponent.tsx";

function ProductListComponent() {
    const [pageResponse, setPageResponse] = useState<IPageResponse>({ ...initPageResponseState });
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useSearchParams();
    const location = useLocation();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;


    const [searchCondition, setSearchCondition] = useState<{ type: string; keyword: string }>({
        type: "pname", // 기본 검색 조건
        keyword: "", // 기본 검색어
    });

    useEffect(() => {
        setLoading(true);
        getProductList(page, size, searchCondition.type, searchCondition.keyword).then((data) => {
            setPageResponse(data)
            setLoading(false)
        });
    }, [query, location.key]);

    const [modal, setModal] = useRecoilState(modalState);

    const openModal = (pno: number) => {
        setModal({
            isModal: true,
            isModify: false,
            pno,
        });
    };


    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCondition((prev) => ({
            ...prev,
            keyword: e.target.value, // 키워드만 업데이트
        }));
    };

    const handleSearchInputType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCondition((prev) => ({
            ...prev,
            type: e.target.value, // 타입만 업데이트
        }));
    };

    const handleSearch = () => {
        setQuery(() => {
            const newParams = new URLSearchParams();
            newParams.set(searchCondition.type, searchCondition.keyword); // 검색어를 쿼리스트링에 반영
            return newParams;
        });
    };

    const ListLi = pageResponse.dtoList.map((product: IProduct) => {
        const { pno, pname, pdesc, price, delFlag, uploadFileNames } = product;

        if (delFlag) return null;

        return (
            <tr key={pno}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img
                                className="w-full h-full rounded-full"
                                src={`http://118.38.219.107:8089/api/products/view/s_${uploadFileNames}`}
                            />
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
                            className="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <span aria-hidden className="absolute inset-0 bg-purple-200 opacity-50 rounded-full"></span>
                            <span className="relative">조회</span>
                        </button>

                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="container mx-auto px-5 sm:px-8">
            {loading && <LoadingComponent/>}
            <div className="py-8">

                {/* 검색 입력과 버튼 */}
                <div className="mb-4 flex items-center space-x-4 p-4 bg-white shadow rounded-lg dark:bg-gray-800">
                    <select
                        name="type"
                        value={searchCondition.type}
                        onChange={handleSearchInputType}
                        className="border border-gray-300 rounded-md mr-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 transition ease-in-out duration-200 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    >
                        <option value="pname">상품명</option>
                        <option value="price">가격</option>
                    </select>

                    <input
                        name="keyword"
                        type="text"
                        value={searchCondition.keyword}
                        onChange={handleSearchInputChange}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-gray-50 transition ease-in-out duration-200 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        placeholder="검색어를 입력하세요"
                    />

                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-purple-500 text-white font-medium rounded-md shadow-md transition ease-in-out duration-200 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                    >
                        검색
                    </button>
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
                    <PageComponent pageResponse={pageResponse} />
                </div>

                {modal.isModal && <AdminProductModalComponent />}
            </div>
        </div>
    );
}

export default ProductListComponent;
