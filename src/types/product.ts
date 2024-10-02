

export interface IProduct {
    pno?: number
    pname: string
    pdesc: string
    price: string
    files: FormData | null
    uploadFileNames: FormData | null
}

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

