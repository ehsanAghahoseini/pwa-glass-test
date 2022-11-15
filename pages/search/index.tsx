import React from "react";
import type {NextPage} from "next";
import {useRouter} from "next/router";
import {baseUrl, customApi} from "../../apis";
import Skeleton from "react-loading-skeleton";
import FilterGlassesComponent from "../../components/filterGlassesComponent";
import {toast} from "react-toastify";
import {ProductsCartSkeleton} from "../../components/skeletons";
import Link from "next/link";
import {LazyLoadImage} from "react-lazy-load-image-component";


const Index: NextPage = () => {

    const routing = useRouter();
    const [isLoadingPage, setIsLoadingPage] = React.useState<boolean>(true)
    const [searchType, setSearchType] = React.useState<any>("")
    const [searchBodyData, setSearchBodyData] = React.useState<any>({})
    const [stores, setStores] = React.useState<[]>([])


    React.useEffect(() => {
        if (!routing.query.searchKey) return setIsLoadingPage(true)
        else {
            if(routing.query.type === "shop"){
                setSearchType("shop")
                getSearchShops(routing.query.searchKey)
            }else {
                setSearchType("product")
                setSearchBodyData(routing.query.searchKey)
                setIsLoadingPage(false)
            }
        }
    }, [routing.query])


    async function getSearchShops(keySearch:any) {
        const res = await customApi({ url: `${baseUrl}/shops/search${keySearch ? `?search=${keySearch}` : ""}`}, { method: "GET" })
        if (res.status) {
            setStores(res.data.data)
            setIsLoadingPage(false)
        }else toast(res.message, { type: "error" })
    }

    return (
        <>
            <div className=" w-full lg:w-10/12 m-auto mt-8">
                {searchType === "shop" ?
                    <>
                    <div className=" w-full px-4 flex flex-row py-8 flex-wrap justify-center lg:justify-start">
                        {isLoadingPage ?
                            <>{new Array(6).fill(0).map((e, index) =>
                                <ProductsCartSkeleton key={index}/>
                            )}
                            </> :
                            <>
                                {stores.length !== 0 ? stores.map((item: any, index: number) =>
                                        <>
                                            <Link key={item.id} href={`/s/${item.slug}`}>
                                                <a key={item.id} className=" wow_fade_in w-full md:w-[calc(33%-1rem)] 2xl:w-[calc(25%-1rem)] md:mx-2 ">
                                                    <LazyLoadImage
                                                        className="rounded-md" alt={item.name}
                                                        placeholder={<Skeleton style={{ width: "100%" }} height={120} />}
                                                        src={`${item.cover ? `${item.cover}` : "/assets/media/placeholder.png"}`}
                                                    />
                                                    <div className="flex justify-center w-full mt-1 px-[2px]">
                                                        <p className="text-xl mt-2">{item.name}</p>
                                                    </div>
                                                </a>
                                            </Link>
                                        </>
                                    ) :
                                    <div className="flex justify-center items-center p-10 w-full flex-col">
                                        <img className="w-full mb-4 max-w-[50px] " src='/assets/no-res.png' alt="no-res"/>
                                        <p>No items found</p>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    </>
                    :""
                }
                {searchType === "product" ?
                    <>
                        {!isLoadingPage ?
                            <FilterGlassesComponent isSkeleton={isLoadingPage} requestType={"search"}
                                                    iniDataByFilter={{search: searchBodyData}}/>
                            :
                            <div className=" w-full p-[5rem] flex justify-center items-center">
                                waiting to get search result <span className=" alarm_fade_in_out text-lg ml-1"> ...</span>
                            </div>
                        }
                    </> : ""
                }

            </div>
        </>
    )
}

export default Index;