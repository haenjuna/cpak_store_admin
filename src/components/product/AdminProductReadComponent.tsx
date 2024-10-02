import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {initProductState, IProduct} from "../../types/product.ts";
import {getOne} from "../../apis/productAPI.ts";


function AdminProductReadComponent() {

    const {pno} = useParams()

    const [product, setProduct] = useState<IProduct>({...initProductState})


    useEffect(() => {
        const pnoNum = Number(pno)

        if (pnoNum){
            getOne(pnoNum).then((result:IProduct) => {
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