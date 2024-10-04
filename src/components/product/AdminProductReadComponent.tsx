import {useEffect, useState} from "react";
import {initProductState, IProduct} from "../../types/product.ts";
import {getOne} from "../../apis/productAPI.ts";
import {useParams} from "react-router";


function AdminProductReadComponent() {

    const {pno} = useParams()

    const [product, setProduct] = useState<IProduct>({...initProductState})

    useEffect(() => {
        const pnoNum = Number(pno)

        if (pnoNum){
            getOne(pnoNum).then((result:IProduct) => {
                setProduct(result)
            })
        }

    },[pno])

    console.log(product)

    return (
        <>
        </>
    );
}

export default AdminProductReadComponent