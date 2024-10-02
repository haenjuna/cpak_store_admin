import axios from "axios";
import {IProduct} from "../types/product.ts";


const host = "http://118.38.219.107:8089/api/products"

const header =
    {
        headers: {'content-type' : 'multipart/form-data'}
    }

export const postAdd = async (formData: FormData): Promise<number> => {

    const res = await axios.post(`${host}/`, formData, header)

    console.log(res)
    // return Number(res.data)
    return 0
}

export const getOne = async  (pno: number): Promise<IProduct> => {

    const res = await axios.get(`${host}/${pno}`)

    return res.data
}

export const putOne = async  (product: IProduct): Promise<IProduct> => {

    const res = await axios.put(`${host}/${product.pno}`, product)

    return res.data
}