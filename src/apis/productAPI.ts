import {IPageResponse, IProduct} from "../types/product.ts";
import axios from "axios";
const host:string ='http://118.38.219.107:8089/api/products';
// const host:string ='http://172.30.1.99:8089/api/products';
//const host:string = 'http://localhost:8091/api/products';

const header =
    {
        headers: {'content-type' : 'multipart/form-data'}
    }

export const getProductList = async (page?: number, size?: number, type?:string, keyword?:string): Promise<IPageResponse> => {

    const pageValue: number = page || 1;
    const sizeValue: number = size || 1;

    let query = `${host}/list?page=${pageValue}&size=${sizeValue}`;

    if(type){
        query += `&type=${encodeURIComponent(type)}`; // pname 파라미터 추가
    }

    if(keyword){
        query += `&Keyword=${encodeURIComponent(keyword)}`;
    }

    const res = await axios.get(query);
    return res.data;
};

export const getOne = async(pno:number) : Promise<IProduct> => {
    const res = await axios.get(`${host}/${pno}`)
    return res.data;
}
export const postAdd = async (formData: FormData): Promise<number> => {
    const res = await axios.post(`${host}/`, formData, header)
    console.log(res)
    // return Number(res.data)
    return 0
}
export const putOne = async  (formData: FormData, pno: number): Promise<IProduct> => {
    const res = await axios.put(`${host}/${pno}`, formData)
    return res.data
}
export const deleteOne = async  (pno: number): Promise<IProduct> => {
    const res = await axios.delete(`${host}/${pno}`)
    return res.data
}