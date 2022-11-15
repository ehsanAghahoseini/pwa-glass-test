import React from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";



export const StoresCart = (props: any) => {
    return (
        <>
            <Link key={props.store.id} href={`/s/${props.store.slug}`}>
                <a key={props.store.id} className=" wow_fade_in w-full min-w-[300px] lg:w-[250px] flex flex-col mx-4 my-6 rounded-md overflow-hidden relative group ">
                        <LazyLoadImage
                            className="rounded-md" alt={props.store.name}
                            placeholder={<Skeleton style={{ width: "100%" }} height={120} />}
                            src={`${props.store.cover ? `${props.store.cover}` : "/assets/media/placeholder.png"}`}
                        />
                    <div className="flex justify-center w-full mt-1 px-[2px]">
                        <p className="text-xl mt-2">{props.store.name}</p>
                    </div>
                    {/* <button className=" w-full h-6 bg-ehbi-300 rounded text-white my-1">
                        Show Store
                    </button> */}
                </a>
            </Link>
        </>
    )
}