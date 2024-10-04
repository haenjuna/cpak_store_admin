import {useEffect, useState} from "react";
import {IPageResponse} from "../types/product.ts";
import {useLocation, useSearchParams} from "react-router-dom";
import {getProductList} from "../apis/productAPI.ts";

const initialState: IPageResponse = {
    dtoList: [],
    prev: false,
    next: false,
    totalCount: 10,
    prevPage: 0,
    nextPage: 0,
    totalPage: 10,
    current: 0
}

const useProductList =()=>{

    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState)
    const [loading, setLoading] = useState<boolean>(false)
    const [query] = useSearchParams()
    const location = useLocation()

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    useEffect(() => {
        setLoading(true)
        getProductList(page,size).then(data => {
            setPageResponse(data)
            console.log(data)
            setTimeout(() => {
                setLoading(false)
            }, 600)
        })
    }, [query, location.key]);

    return {loading, pageResponse}
}

export default useProductList