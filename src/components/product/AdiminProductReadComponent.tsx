import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {initProductState, IProduct} from "../../types/product.ts";
import {getOne} from "../../apis/productAPI.ts";


function AdiminProductReadComponent() {

    const {pno} = useParams()

    const [product, setProduct] = useState<IProduct>({...initProductState})

    useEffect(() => {
        const pnoNum = Number(pno)

        getOne(pnoNum).then(result => {
            console.log(result)
        })
    },[pno])

    return (
        <div></div>
    );
}

export default AdiminProductReadComponent;