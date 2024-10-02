export interface IProduct {
    pno?: number
    pname: string
    pdesc: string
    price: string
    delFlag: boolean
    files: FormData | null
    uploadFileNames: FormData | null
}

// 객체 초기화 ( IProduct )
export const initProductState:IProduct = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: '',
    files: null,
    delFlag: false,
    uploadFileNames:null
};

export interface IPageResponse{
    dtoList: IProduct[],
    prev: boolean,
    next: boolean,
    totalCount: number,
    prevPage: number,
    nextPage: number
    totalPage: number
    current: number
}

