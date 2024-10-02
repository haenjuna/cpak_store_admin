import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {initPageResoponseState, IPageResponse} from "../../types/product.ts";
import {getOne} from "../../apis/ProductAPI.ts";



function AdminProductReadComponent() {

    const {pno} = useParams()

    const [product, setProduct] = useState<IPageResponse>({...initPageResoponseState})

    useEffect(() => {
        const pnoNum = Number(pno)

        getOne(pnoNum).then(result => {
            setProduct(result)
        })
    },[pno])

    console.log(product)

    return (
        <div>

        </div>
    );
}

export default AdminProductReadComponent;