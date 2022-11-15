import React from "react"
import Skeleton from "react-loading-skeleton";


export const ProductsCartSkeleton = () => {
    return (
        <div className=" wow_fade_scale w-full md:w-[calc(33%-1rem)] 2xl:w-[calc(25%-1rem)] md:mx-2 flex flex-col my-6 rounded-md overflow-hidden relative group min-w-[250px]">
            <Skeleton className=" h-[220px] lg:h-[130px]" style={{ width: "100%" }} />
            <div className="flex justify-between w-full mt-2 px-[2px]">
                <Skeleton style={{ width: "80px" }} height={20} />
                <Skeleton style={{ width: "60px" }} height={20} />
            </div>
            <div className="flex justify-between w-full mt-2 px-[2px]">
                <Skeleton style={{ width: "50px" }} height={20} />
                <Skeleton style={{ width: "30px" }} height={20} />
            </div>
        </div>
    )
}

export const ProductDetailsSkeleton = () => {
    return (
        <>
            <div className={` w-11/12 m-auto lg:w-9/12 flex flex-col justify-center mt-8`}>
                <div className={`w-full flex flex-wrap justify-center`}>
                    <div className=" w-full lg:w-[calc(100%-420px)] ">
                        <Skeleton className="w-full h-[300px] sm:h-[280px] md:h-[340px] lg:h-[480px]" />
                    </div>
                    <div className="w-full max-w-[420px] flex flex-col p-4 pt-0 mt-6 lg:mt-0">
                        <div className="flex justify-between">
                            <Skeleton style={{ width: "120px" }} height={40} />
                            <Skeleton style={{ width: "35px" }} height={35} />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton style={{ width: "150px" }} height={20} />
                            <Skeleton style={{ width: "100px" }} height={20} />
                        </div>
                        <Skeleton style={{ width: "120px", marginTop: "2rem" }} height={30} />
                        <div className="flex justify-between pl-4 mt-4">
                            <Skeleton style={{ width: "150px" }} height={20} />
                            <Skeleton style={{ width: "100px" }} height={20} />
                        </div>
                        <div className="flex justify-between pl-4">
                            <Skeleton style={{ width: "150px" }} height={20} />
                            <Skeleton style={{ width: "100px" }} height={20} />
                        </div>
                        <div className="flex justify-between pl-4">
                            <Skeleton style={{ width: "150px" }} height={20} />
                            <Skeleton style={{ width: "100px" }} height={20} />
                        </div>
                        <div className="flex justify-between pl-4">
                            <Skeleton style={{ width: "150px" }} height={20} />
                            <Skeleton style={{ width: "100px" }} height={20} />
                        </div>
                        <div className="flex justify-between pl-4">
                            <Skeleton style={{ width: "150px" }} height={20} />
                            <Skeleton style={{ width: "100px" }} height={20} />
                        </div>
                        <Skeleton className="w-10\12 rounded-lg h-[120px] mt-6 " />
                        <Skeleton className="w-10\12 rounded-lg h-[40px] mt-8 " />
                    </div>
                </div>
            </div>
        </>

    )
}


export const StorePageSkeleton = () => {
    return (
        <>
            <div className={` w-11/12 m-auto lg:w-9/12 flex flex-col justify-center mt-8`}>
                <div className={`w-full flex flex-wrap justify-center`}>
                    <div className=" w-full md:w-[380px]">
                        <Skeleton className="w-full h-[240px] sm:h-[200px] md:h-[270px] lg:h-[300px]" />
                        <div className="flex justify-center w-full">
                            <Skeleton style={{ width: "180px", marginTop: "1rem" }} height={25} />
                        </div>
                    </div>
                    <div className="w-full md:w-[calc(100%-380px)]  flex flex-col md:px-6">
                        <div className="border-b p-2">
                            <Skeleton style={{ width: "180px", marginTop: "1rem" }} height={25} />
                        </div>
                        <div className="w-full flex flex-col p-4 text-sm">
                            <div className="flex items-center mt-2">
                                <Skeleton style={{ width: "80px", marginRight: "1rem" }} height={20} />
                                <Skeleton style={{ width: "150px" }} height={20} />
                            </div>
                            <div className="flex items-center mt-2">
                                <Skeleton style={{ width: "80px", marginRight: "1rem" }} height={20} />
                                <Skeleton style={{ width: "150px" }} height={20} />
                            </div>
                            <div className="flex items-center mt-2">
                                <Skeleton style={{ width: "80px", marginRight: "1rem" }} height={20} />
                                <Skeleton style={{ width: "150px" }} height={20} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



