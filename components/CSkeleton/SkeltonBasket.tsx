import CSkeleton from "./CSkeleton";


const SkeltonBasket = () => {

    return (
        <div className="w-full flex flex-col items-center ">
            <div className="w-full max-w-[1400px]  sm:min-h-[70px] min-h-[40px] flex justify-center items-center text-base md:text-lg text-gr-300">
                {/* <span>ALL BASKET</span> */}
            </div>
            <div className=" w-full max-w-[1000px] flex flex-col  p-[10px] md:p-[20px] sm:p-[10px]">
                <div className=" w-full flex flex-col border-2 border-gr-100 rounded mb-6">
                    <div className="   p-3 flex items-center">
                        <div className=" w-[60px] h-[60px] shadow rounded-full overflow-hidden"  >
                            <CSkeleton />
                        </div>
                        <div className=" flex flex-col ml-3">
                            <span className="text-sm mb-2 w-[70px] h-[20px] rounded overflow-hidden"><CSkeleton /></span>
                            <span className="text-sm mb-2 w-[70px] h-[20px] rounded overflow-hidden"><CSkeleton /></span>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col p-3 ">
                        {[0, 0, 0].map((item: any, index: number) =>
                            <div key={index} className=" flex items-center justify-between mb-6 md:mb-3">
                                <div className=" w-6/12 md:w-5/12 md:h-[200px] h-[120px] rounded-[10px] overflow-hidden"  >
                                    <CSkeleton />
                                </div>
                                <div className=" w-6/12 md:w-7/12 flex md:flex-row flex-col items-center">
                                    <div className=" w-full md:w-6/12 flex flex-col  items-center">
                                        <span className="text-sm"><div className=" w-[70px] h-[20px] rounded overflow-hidden"><CSkeleton /></div></span>
                                        <div className=" w-[20px] h-[20px] rounded-full overflow-hidden my-2" ><CSkeleton /></div>
                                        <span className=" w-[70px] h-[20px] rounded overflow-hidden "><CSkeleton /></span>
                                    </div>
                                    <div className=" w-full md:w-6/12   flex items-center justify-between pl-3 md:mt-0 mt-3">
                                        <div className=" w-[25px] h-[25px] rounded-full  flex justify-center items-center text-white overflow-hidden cursor-pointer">
                                            <CSkeleton />
                                        </div>
                                        <span className="text-gr-300"></span>
                                        <div className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center text-white overflow-hidden cursor-pointer">
                                            <CSkeleton />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" w-full flex items-center justify-end mt-[20px] pb-5 pr-3">
                        <div className="w-[200px] h-[40px]   rounded-[30px] flex justify-center items-center mx-2 text-sm cursor-pointer overflow-hidden"><CSkeleton /></div>
                        <div className="w-[200px] h-[40px]  rounded-[30px] flex justify-center items-center text-white text-sm  cursor-pointer overflow-hidden"><CSkeleton /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeltonBasket;