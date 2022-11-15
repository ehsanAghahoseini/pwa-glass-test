import CSkeleton from "./CSkeleton";
import dynamic from "next/dynamic";

const Flickity:any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})

const SkeltonBrandCart = () => {

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
                    <div key={index} className=" w-[130px] flex flex-col  mx-[20px]">
                        <div className=" w-full  mb-[12px] flex flex-col">
                            <div className=" w-full h-[90px] rounded-[10px] cursor-pointer" >
                                <CSkeleton />
                            </div>
                        </div>
                        <div className=" w-full  mb-[7px] flex flex-col">
                            <div className=" w-full h-[90px] rounded-[10px] cursor-pointer" >
                                <CSkeleton />
                            </div>
                        </div>
                    </div>
                )}
            </Flickity>
        </>
    )
}

export default SkeltonBrandCart;