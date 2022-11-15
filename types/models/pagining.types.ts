export declare type MetaModel = {
    current_page: string,
    last_page: string,
    per_page: string,
    total: string
}


export declare type PaginingModel = {
    meta: MetaModel , 
    data :any[] ,
}

