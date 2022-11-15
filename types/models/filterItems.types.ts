
export declare type FilterItemsModel =  {
        filter : FilterSingleModel[] ,
        price : PriceRangeModel
}

export declare type FilterSingleChildModel =  {
    key: string ,
    display_name: string ,
    items:[] ,
}


export declare type FilterSingleModel =  {
    base:FilterSingleChildModel[] ,
    advance:FilterSingleChildModel[] ,
}


export declare type PriceRangeModel =  {
    max : number ,
    min: number ,
}

