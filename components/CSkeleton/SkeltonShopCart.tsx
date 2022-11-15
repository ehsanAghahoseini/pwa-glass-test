import CSkeleton from "./CSkeleton";
import dynamic from "next/dynamic";

const Flickity:any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})



const SkeltonShopCart = () => {

    const flickityOptionMainSlider = {
        initialIndex: 3,
        pageDots: false,
        accessibility: true,
        contain: true,
        wrapAround: true,
        autoPlay: 5000,
        bgLazyLoad: true,
        prevNextButtons: true,
        adaptiveHeight: true
    }

    return (
        <>
            <Flickity
                        className={'carousel-main-slider'} // default ''
                        elementType={'div'} // default 'div'
                        options={flickityOptionMainSlider} // takes flickity options {}
                        disableImagesLoaded={false} // default false
                        reloadOnUpdate={true} // default false
                        static={true} // default false
                    >
                        {[0, 0, 0, 0, 0, 0, 0, 0].map((item: any, index: number) =>
                            <div key={index} className=" md:w-[400px] w-[300px] flex flex-col  mx-[6px] overflow-hidden">
                                <div className=" w-full flex flex-col mb-[15px]">
                                    <div className=" w-full h-[200px] rounded overflow-hidden">
                                        <CSkeleton />
                                    </div>
                                    <div className=" w-full flex mt-[10px] justify-around items-center">
                                        <div className=" w-3/12 h-[20px] rounded overflow-hidden">
                                            <CSkeleton />
                                        </div>
                                        <div className=" w-3/12 h-[20px] rounded overflow-hidden">
                                            <CSkeleton />
                                        </div>
                                    </div>
                                </div>
                                <div className=" w-full flex flex-col mb-[15px]">
                                    <div className=" w-full h-[200px] rounded overflow-hidden">
                                        <CSkeleton />
                                    </div>
                                    <div className=" w-full flex mt-[10px] justify-around items-center">
                                        <div className=" w-3/12 h-[20px] rounded overflow-hidden">
                                            <CSkeleton />
                                        </div>
                                        <div className=" w-3/12 h-[20px] rounded overflow-hidden">
                                            <CSkeleton />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Flickity>
        </>
    )
}

export default SkeltonShopCart;