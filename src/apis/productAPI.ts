import Axios from "axios";
import {IPageResponse} from "../types/product.ts";
import axios from "axios";

const host:string ='http://118.38.219.107:8089/api/products';

export const getProductList = async( page?:number, size?:number): Promise<IPageResponse> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await Axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`);

    return res.data;

}

export const getOne = async(pno:number) : Promise<IPageResponse> => {

    const res = await axios.get(`${host}/${pno}`)

    return res.data;
}