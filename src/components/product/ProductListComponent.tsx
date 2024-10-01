import {getProductList} from "../../apis/ProductAPI.ts";
import {useEffect, useState} from "react";
import {IPageResponse, IProduct} from "../../types/product.ts";

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

function ProductListComponent() {

    const [products, setProducts] = useState<IPageResponse>({...initialState})

    useEffect(() => {
        getProductList().then(data => {
            setProducts(data)
        })
    }, []);

    const ListLI = products.dtoList.map((product:IProduct)=>{

        const {pno, price, pname, pdesc} = product

        return (
            <li key={pno}>
                {pno} - {price} - {pname} - {pdesc}
            </li>)
    })

    return (
        <div>
            <ul>
                {ListLI}
            </ul>
        </div>
    );
}

export default ProductListComponent;