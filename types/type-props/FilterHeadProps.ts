import { CategoryModel } from "../models/category.types"

export declare type FilterHeadProps = {
    categoryData: CategoryModel[],
    activeFilter : {
        parent: string ,
        category: string ,
        subCat: string ,
    },
    parmsFilter : any ,
    isPrice : boolean ,
    sideView : string ,
    filterUrl : string ,
    setActiveFilter: (text: any) => void;
    setParmsFilter: (text: any) => void;
    setSideView: (text: string) => void;
    setIsSkeleton: CallableFunction;
    isBack?:boolean ,
    api_url:string ,
}
