import { useEffect, useState } from "react";
import { useSearchParams, useLocation} from "react-router-dom";
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
    const location = useLocation();;

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;
    const pnameQuery: string = query.get("pname") || ""; // 쿼리스트링에서 pname 가져오기

    const [searchTerm, setSearchTerm] = useState<string>(pnameQuery); // 쿼리스트링으로부터 검색어 초기화

    useEffect(() => {
        setLoading(true);
        getProductList(page, size, pnameQuery).then((data) => {
            setPageResponse(data);
            setLoading(false);
            console.log(query.toString())
        });
    }, [searchTerm, location.key]);

    const [modal, setModal] = useRecoilState(modalState);

    const openModal = (pno: number) => {
        setModal({
            isModal: true,
            isModify: false,
            pno,
        });
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        // 쿼리스트링에 pname을 추가하고 URL을 갱신
        setQuery((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("pname", searchTerm); // 검색어를 쿼리스트링에 반영
            return newParams;
        });

        // 또는 navigate로 URL을 변경할 수도 있음
        // navigate(`?page=${page}&size=${size}&pname=${searchTerm}`);
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
                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 border-purple-50"
                        >
                            조회
                        </button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="container mx-auto px-4 sm:px-8">
            {loading && <LoadingComponent></LoadingComponent>}
            <div className="py-8">
                <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Admin Product List Page
                </h2>

                {/* 검색 입력과 버튼 */}
                <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        className="px-4 py-2 border rounded w-full"
                        placeholder="상품명을 입력하세요"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                    <PageComponent pageResponse={pageResponse}></PageComponent>
                </div>

                {modal.isModal && <AdminProductModalComponent></AdminProductModalComponent>}
            </div>
        </div>
    );
}

export default ProductListComponent;
