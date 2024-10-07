import {useEffect, useState} from "react";
import {initPageResponseState, IPageResponse} from "../types/product.ts";
import {createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {getProductList} from "../apis/productAPI.ts";


const useProductList = () => {

    const [query, setQuery]=useSearchParams('');
    const location = useLocation()
    const navigate = useNavigate();

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    const [loading,setLoading] = useState<boolean>(false)

    const [pageResponse,setPageResponse] = useState<IPageResponse>({...initPageResponseState})
    const queryStr = createSearchParams({page: String(page),size: String(size)})
    const [searchCondition, setSearchCondition] = useState<{ type: string; keyword: string }>({
        type: query.get("type") || "pname", // 기본 검색 조건
        keyword: query.get("keyword") || "", // 기본 검색어
    });

    const handleSearch = () => {
        setQuery(() => {
            const newParams = new URLSearchParams();
            newParams.set(searchCondition.type, searchCondition.keyword); // 검색어를 쿼리스트링에 반영
            return newParams;
        });
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCondition((prev) => ({
            ...prev,
            keyword: e.target.value, // 키워드만 업데이트
        }));
    };

    const handleSearchInputType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSearchCondition((prev) => ({
            ...prev,
            type: e.target.value, // 타입만 업데이트
        }));
    };



    const moveToRead = (mno:number | undefined) => {
        navigate({
            pathname: `/product/read/${mno}`,
            search: `?${queryStr}`
        })
    }

    useEffect(() => {
        setLoading(true)
        getProductList(page, size, searchCondition.type, searchCondition.keyword).then(data => {
            setPageResponse(data)
            setLoading(false)
        })
    },[query,location.key])



    return {loading, pageResponse, searchCondition, moveToRead, handleSearch, handleSearchInputChange, handleSearchInputType}
}

export default useProductList