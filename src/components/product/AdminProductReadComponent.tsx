import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {initPageResponseState, IPageResponse} from "../../types/product.ts";
import {getOne} from "../../apis/ProductAPI.ts";


function AdminProductReadComponent() {

    const {pno} = useParams()

    const [product, setProduct] = useState<IPageResponse>({...initPageResponseState})


    useEffect(() => {
        const pnoNum = Number(pno)

        if (pnoNum){
            getOne(pnoNum).then((result:IPageResponse) => {
                console.log(result)
                setProduct(result)
            })
        }

    },[pno])

    console.log(product)

    return (
        <div>

        </div>
    );
}

export default AdminProductReadComponent;