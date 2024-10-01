import axios from "axios";


const host = "http://118.38.219.107:8089/api/products"

const header =
    {
        headers: {'content-type' : 'multipart/form-data'}
    }

export const postAdd = async (formData: FormData):Promise<number> => {

    const res = await axios.post(`${host}/`, formData, header)

    console.log(res)
    // return Number(res.data)
    return 0
}