import { FilterItemsModel, FilterSingleModel, PriceRangeModel } from "../models/filterItems.types"

export declare type FilterInputsProps = {
    title? : string ,
    filterData : FilterSingleModel ,
    activeFilter : {
        parent: string ,
        category: string ,
        subCat: string ,
    },
    isPrice: boolean ,
    parmsFilter : any ,
    priceRange : PriceRangeModel ,
    displaySkelton : boolean ,
    setActiveFilter: (text: string) => void;
    setParmsFilter: (text: string) => void;
    onFinishFilter: ()=>void ;
    clearFilter?:()=>void ;
    setIsSkeleton?:CallableFunction ;
    setVisibleMoreFilter?: (text: boolean) => void;
    visibleMoreFilter?: boolean ,
}
