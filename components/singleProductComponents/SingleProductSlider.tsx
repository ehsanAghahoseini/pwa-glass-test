import React, { useEffect } from "react";
import CImage from "../CImage";
import 'flickity-as-nav-for';
import dynamic from "next/dynamic";

const Flickity: any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})


interface ISingleProductSlider {
    topImg: string,
    leftImg: string,
    rightImg: string,
    delivery_day:string
}

const SingleProductSlider: React.FunctionComponent<ISingleProductSlider> = ({ leftImg, rightImg, topImg , delivery_day }) => {

    const flickityOptionMainSlider = {
        prevNextButtons: true,
        autoPlay: false,
        initialIndex: 0,
        accessibility: true,
        contain: true,
        pageDots: false,
        wrapAround: true,
        asNavFor: ".carousel.carousel-main",
    }


    return (
        <div className=" w-full relative">
            <Flickity
                key={topImg}
                className={'carousel-main'} // default ''
                elementType={'div'} // default 'div'
                options={{...flickityOptionMainSlider, }} // takes flickity options {}
                disableImagesLoaded={false} // default false
                static={true} // default false
            >
                <img key={topImg} className="w-full " alt={'image'} src={topImg} />
                <img key={rightImg} className="w-full " alt={'image'} src={rightImg} />
                <img key={leftImg} className="w-full " alt={'image'} src={leftImg} />
            </Flickity>

            <div className=" w-full flex lg:flex-row flex-col mt-[25px]">
                <div className=" w-full md:w-8/12">
                    <Flickity
                        className="carousel-nav carousel-nav-mini "
                        options={{
                            asNavFor: ".carousel-main",
                            contain: true,
                            pageDots: false
                        }}
                    >
                        <img key={topImg} className="w-[130px] h-[80px] mx-3 " alt={'image'} src={topImg} />
                        <img key={rightImg} className="w-130px] h-[80px] mx-3" alt={'image'} src={rightImg} />
                        <img key={leftImg} className="w-[130px] h-[80px] mx-3" alt={'image'} src={leftImg} />
                    </Flickity>
                </div>
                <div className=" w-full md:w-4/12 lg:my-0 my-2 flex items-center justify-center">
                    <div className=" w-[180px] h-[35px] bg-gr-100 rounded-[30px] border border-gr-300 flex items-center justify-center">
                        <img src="/assets/svg/car.png" className=" w-5 mr-2" />
                        <span>{delivery_day} Day Shipping</span>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default SingleProductSlider

const FakeData = [
    'https://api.optics4less.com/storage/products/clients/3/aJBwJ6ba343f324db6fd0b02d00f864e68199.jpg',
    'https://api.optics4less.com/storage/products/clients/3/BGeRYwarbyparker-63d9234bda534a79be0a8b3462c27906.jpg',
    'https://api.optics4less.com/storage/products/clients/3/Ltjg9IMG_3296-7cdd7d213bdf46b0b5cad99ce40b8a3a.jpeg'
]