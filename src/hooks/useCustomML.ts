import {useState} from "react";
import {initProductState, IProduct} from "../types/product.ts";


const useCustomML = () => {

    const [loading, setLoad] = useState(false)

    // @ts-ignore
    const setLoading = (value) => {
        setLoad(value)
    }

    const [product, setProduct] = useState<IProduct>({...initProductState})

    // @ts-ignore
    const setProductData = (value) => {
        setProduct(value)
    }

    return {loading, product, setLoading, setProductData}
}


export default useCustomML