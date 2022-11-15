import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {baseUrl, customApi} from "../../apis";
import Skeleton from "react-loading-skeleton";
import FilterGlassesComponent from "../../components/filterGlassesComponent";


const Index: NextPage = () => {

    const routing = useRouter();
    const [isLoadingPage, setIsLoadingPage] = React.useState<boolean>(true)
    const [slugData, setSlugData] = React.useState<any>({})

    async function getCategorySlug(cat:any) {
        setIsLoadingPage(true)
        const res = await customApi({ url: `${baseUrl}/categories/${cat}` }, { method: "GET" })
        if (res.status) {
            setSlugData(res.data)
        }
        setIsLoadingPage(false)
    }

    React.useEffect(() => {
        if (!routing.query.id) return setIsLoadingPage(true)
        else {
            getCategorySlug(routing.query.id).then()
        }
    }, [routing.query.id])

    return(
        <>
            <div className=" w-full lg:w-10/12 m-auto mt-8 px-2">
                {slugData.image ?
                    <img alt="banner" src={slugData.image} className={"w-full rounded-lg"}/>
                    :
                    <Skeleton className={"w-full h-[300px] md:h-[440px] lg-[590px] rounded-lg"}/>
                }
                {!isLoadingPage ?
                    <FilterGlassesComponent  isSkeleton={isLoadingPage} requestType={"category"}
                                             iniDataByFilter={{slug: slugData.slug}}/>
                    : ""}

            </div>

        </>
    )
}

export default Index;