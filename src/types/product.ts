

export interface IProduct {
    pno?: number
    pname: string
    pdesc: string
    price: string
    delFlag: boolean
    files: FormData | null
    uploadFileNames: FormData | null
}
