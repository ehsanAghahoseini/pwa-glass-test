import React from "react";
import { baseUrl, customApi, filterGlasses } from "../../apis";
import { ApiFilterGlasses, InputHandlerFilter, ParentCat, ProductPositionState } from "../../types/filterGlasses.types";
import { FilterCategoryOptions } from "../../types/home.types";
import { toast } from "react-toastify";
import { ProductCartWithContainer } from "../productComponents/productCart";


// const FilterGlassesComponent = (props: Partial<{iniDataByFilter: Partial<ApiFilterGlasses>, iniDataByStaticData: any, userId: any}>) => {
const FilterGlassesComponent = (props: Partial<{
    iniDataByFilter: any,
    iniDataByStaticData: any,
    userId: any,
    isSkeleton: boolean,
    sponsor: boolean,
    requestType: "shop" | "category" | "sponsor" | "search",
    shopPage?: boolean
}>) => {

    const [selectedPCat, setSelectedPCat] = React.useState<string>("")
    const [selectedOption, setSelectedOptions] = React.useState<any>({})
    const [products, setProducts] = React.useState<[]>([])
    const [categoriesList, setCategoriesList] = React.useState<[]>([])
    const [filterOptionsDynamic, setFilterOptionsDynamic] = React.useState<any[]>([])
    const [isSkeleton, setSkeleton] = React.useState<boolean>(true)
    const [productPositionState, setProductPositionState] = React.useState<ProductPositionState>("top")
    const [stores, setStores] = React.useState<[]>([])
    const [keyFilterStores, setKeyFilterStores] = React.useState<any>("")
    const [activeFilterStores, setActiveFilterStores] = React.useState<boolean>(false)


    React.useEffect(() => {
        if (props.userId) {
            setSelectedOptions({ user_id: props.userId })
        }
        if (props.iniDataByFilter) {
            getIniData(props.iniDataByFilter)
            if (props.iniDataByFilter.user_id) setSelectedOptions({ user_id: props.iniDataByFilter.user_id })
        }
        if (props.iniDataByStaticData) {
            setProducts(props.iniDataByStaticData)
            if (!props.isSkeleton) {
                setSkeleton(false)
            }
        }
    }, [props.iniDataByStaticData, props.iniDataByFilter, props.isSkeleton])

    React.useEffect(() => {
        getDynamicFilterOptions()
        getCategory()
        getSearchShops()
    }, [])

    async function getCategory() {
        const res = await customApi({ url: `${baseUrl}/categories` }, { method: "GET" })
        if (res.status) {
            setCategoriesList(res.data)
        }
    }

    // getShops to filter product
    async function getSearchShops(keySearch?: any) {
        const res = await customApi({ url: `${baseUrl}/shops/search${keySearch ? `?search=${keySearch}` : ""}` }, { method: "GET" })
        if (res.status) {
            setStores(res.data.data)
        } else toast(res.message, { type: "error" })
    }


    // updated backend
    async function getDynamicFilterOptions() {
        const req = await customApi({ url: `${baseUrl}/products/filter` }, {})
        if (req.status) setFilterOptionsDynamic(req.data)
    }

    // --------------------  Set Position Product Image Index  -------------------- //
    function setPosition(position: ProductPositionState) {
        setProductPositionState(position)
    }

    // --------------------  Initial request filter product from props  -------------------- //
    async function getIniData(body: any) {
        setSelectedOptions(body)
        const res = await reqFilter(body)
        return res
    }

    // --------------------  request filter product  -------------------- //
    async function reqFilter(body: any, filterProductByShop?: any) {
        setSkeleton(true)
        // const res : any = await props.sponsor ? await filterGlasses(body, true) : await filterGlasses(body, false)
        let res: any
        if (filterProductByShop) res = await filterGlasses({ user_id: filterProductByShop }, "shop")
        else if (props.requestType === "shop") res = await filterGlasses(body, "shop")
        else if (props.requestType === "sponsor") res = await filterGlasses(body, "sponsor")
        else if (props.requestType === "category") res = await filterGlasses(body, "category")
        else if (props.requestType === "search") res = await filterGlasses(body, "search")
        if (res.status) {
            let initialProDuct: any = res.data.data.map((item: any) => {
                let childContent = { ...item.children[0], choosed: true }
                let childList = []
                for (let i in item.children) {
                    if (item.children[i].id !== item.children[0].id) {
                        childList.push(item.children[i])
                    }
                }
                return { ...item, children: [...childList, childContent] }
            })
            setProducts(initialProDuct)
        } else toast("an error accrued while get the products", { type: "error" })
        setSkeleton(false)
        return res
    }

    // --------------------  filter product by shop Id  -------------------- //
    async function shopIdFilter(shopID: any) {
        const lastSelectedOption = selectedOption
        lastSelectedOption["user_id"] = [shopID]
        setSelectedOptions(lastSelectedOption)
        let checkInputList = document.getElementsByTagName("input")
        for (let i in checkInputList) {
            if (checkInputList[i].type === "checkbox") {
                checkInputList[i].checked = false
            }
        }
        return await reqFilter(lastSelectedOption, shopID)
    }

    // --------------------  filter product by Parnet Category  -------------------- //
    async function parentCatFilter(catID: any) {
        setSelectedPCat(catID)
        const lastSelectedOption = selectedOption
        lastSelectedOption["category_id"] = catID.id
        setSelectedOptions(lastSelectedOption)
        return await reqFilter(lastSelectedOption)
    }


    // --------------------  filter product by options  -------------------- //
    async function inputHandlerFilter(val: InputHandlerFilter) {
        if (val.check) {
            if (selectedOption[val.cat]) {
                if (!selectedOption[val.cat].includes(val.item)) {
                    let data = await { ...selectedOption };
                    await data[val.cat].push(val.item);
                    setSelectedOptions(data)
                }
            } else {
                selectedOption[val.cat] = [val.item]
            }
        } else {
            const n = await selectedOption[val.cat].indexOf(val.item)
            await selectedOption[val.cat].splice(n, 1)
            if (selectedOption[val.cat].length === 0) delete selectedOption[val.cat]
        }
        const body: any = await selectedOption
        await reqFilter(body)
    }


    // --------------------  ParnetCategory Component -------------------- //
    const RenderFilterType = (value: any) => {
        return (
            <>
                <div className=" w-full max-w-screen-xl md:m-auto flex justify-center z-10 flex-wrap">

                    {value.map((val: any) =>
                        <>
                            <div key={val.id} onClick={() => parentCatFilter(val)}
                                className={` text-xs md:textsm ${selectedPCat === val ? "bg-teal-300 text-cyan-900" : "bg-zinc-900 text-slate-50"} cursor-pointer mx-3 mt-2 md:mt-0 flex items-center justify-center shadow px-3 py-1 hover:bg-teal-300 hover:text-cyan-900`}>
                                {val.name}
                            </div>
                        </>)}
                    {!props.shopPage ?
                        <div key={-10} onClick={() => setActiveFilterStores(!activeFilterStores)}
                            className={` text-xs md:textsm ${activeFilterStores ? "bg-teal-300 text-cyan-900" : "bg-zinc-900 text-slate-50"} cursor-pointer mx-3 mt-2 md:mt-0  flex items-center justify-center shadow px-3 py-1 hover:bg-teal-300 hover:text-cyan-900`}>
                            Optical shops
                        </div>
                        : ""}
                </div>
            </>
        )
    }

    // --------------------  Options Category Component -------------------- //
    const RenderFilterOption = (): any => {
        return (
            <div className=" flex mt-6 border-y sm:w-full px-4 md:px-0 overflow-auto md:overflow-visible py-0 w-full">
                {filterOptionsDynamic.filter((item: any) => {
                    if (item.items.length !== 0) return item
                }).map((item, index) =>
                    <p key={item.key}
                        className={` z-10 my-[-1px] min-w-[80px] w-max border-l-white border-solid flex justify-center relative text-xs md:xs items-center p-2 md:p-4  group cursor-pointer transition-all border-[1px] hover:border-l-[1px] ${index === filterOptionsDynamic.length - 1 && "border-r-white"} hover:border-zinc-200 hover:border-b-bg-slate-50 hover:bg-slate-50 `}>
                        {item.display_name}
                        <div
                            className=" overflow-auto max-h-[200px] z-20 flex-col py-6 px-4 min-w-[150px] border-zinc-200 bg-slate-50 absolute border-solid hidden right-[-2px] left-[-1px] top-3/4 group-hover:flex group-hover:top-full group-hover:border-[1px] group-hover:border-t-0">
                            {item.items.map((val: any) =>
                                <label key={val} className="flex items-center py-1">
                                    <input onChange={(inputValue) => {
                                        inputHandlerFilter({
                                            cat: item.key,
                                            item: val,
                                            check: inputValue.target.checked
                                        })
                                    }}
                                        type={"checkbox"} id={val} name={val} value={val} />
                                    <span className="ml-2 cursor-pointer"> {val}</span><br />
                                </label>)}
                        </div>
                    </p>
                )}
            </div>
        )
    }

    function filterStores(item: any) {
        if (!keyFilterStores) return item
        if (item.name.includes(keyFilterStores)) {
            return item
        }
    }


    return (
        <>
            <div className="w-full m-auto flex flex-col  py-6 px-1 lg:px-4 2xl justify-center flex-wrap">
                <h1 className=" text-center my-4 font-bold w-full">FILTER</h1>
                {/* -------------- ParentCat Compnents -------------- */}
                {RenderFilterType(categoriesList)}
                {!props.shopPage ?
                    <div className={` flex mt-4 py-2 items-center overflow-auto transition-all duration-300 ${!activeFilterStores ? " h-0 overflow-hidden opacity-0 invisible" : " h-[80px]"}`}>
                        <input onChange={(e: any) => { setKeyFilterStores(e.target.value) }}
                            className=" transition-all duration-200 w-full min-w-[110px] focus:min-w-[150px] max-w-[120px] md:max-w-[220px]  border border-gray-200 focus:outline-none m-0 p-2 rounded-lg mr-4" placeholder="search shop" />
                        {stores.length !== 0 ? stores
                            .filter((items) => filterStores(items))
                            .map((items: any) =>
                                <div key={items.id} onClick={() => { shopIdFilter(items.id) }}
                                    className=" flex items-center py-1 px-2 border border-gray-200 rounded-2xl hover:bg-gray-200 transition-all duration-200 justify-center mr-2 cursor-pointer w-max">
                                    <img src={`${items.logo}`} className=" rounded-full max-w-[30px] mr-2" />
                                    <p className=" w-max">{items.name}</p>
                                </div>
                            )
                            : "no Items"}
                    </div>
                    : ""}

                <div onClick={() => {
                }} className={` flex items-center justify-center cursor-pointer text-teal-600 min-h-[40px] w-full`}>
                    <div onClick={() => setPosition("left")} className="flex mx-2 text-sm">
                        <img className={" max-w-[50px]"} src={"/assets/media/static/side.png"} />
                    </div>
                    <div onClick={() => setPosition("top")} className="flex  mx-2 text-sm">
                        <img className={" max-w-[50px]"} src={"/assets/media/static/front.png"} />
                    </div>
                    <div onClick={() => setPosition("right")} className="flex mx-2 text-sm">
                        <img className={" max-w-[50px]"} src={"/assets/media/static/side2.png"} />
                    </div>
                </div>
                {/* -------------- Options Compnents -------------- */}
                {RenderFilterOption()}


                {/* -------------- Product Items Compnents -------------- */}
                <ProductCartWithContainer postistionState={productPositionState} isSkeleton={isSkeleton}
                    products={products} setProducts={setProducts} />

            </div>
        </>
    )
}

export default FilterGlassesComponent