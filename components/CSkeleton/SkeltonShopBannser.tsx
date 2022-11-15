import CSkeleton from "./CSkeleton";


const SkeltonShopBannser = () => {

    return (
        <>
            <div className="w-full max-w-[1400px]  sm:min-h-[70px] min-h-[40px] flex justify-center items-center text-base md:text-lg text-gr-300">
                <span className=" w-[140px] h-[20px] rounded overflow-hidden"><CSkeleton/></span>
            </div>
            <div className=" w-full max-w-[1400px] relative">
                <div  className=" w-full md:h-[300px] h-[180px] overflow-hidden" ><CSkeleton/></div>
                <div className=" w-[50px] md:w-[100px] md:h-[100px] h-[50px] rounded-full border absolute md:left-[100px] left-[25px] md:bottom-[-50px] bottom-[-25px] overflow-hidden">
                    <div className=" w-full h-full overflow-hidden" ><CSkeleton/></div>
                </div>
            </div>
        </>
    )
}

export default SkeltonShopBannser;