import CSkeleton from "./CSkeleton";


const SkeltonOrders = () => {
    return (
        <>
            <div className=" w-full mb-6 py-3 rounded border-b flex items-center flex-wrap overflow-hidden">
                <div className=" w-full md:w-[100px] flex flex-row md:flex-col items-center  overflow-hidden md:mb-0 mb-5">
                    <div className=" w-12 h-12  rounded-full overflow-hidden" ><CSkeleton /></div>
                    <span className=" w-[60px] h-[10px] text-gray-800 text-xs mt-0 md:mt-4 ml-[15px] md:ml-0"><CSkeleton /></span>
                </div>
                <div className=" w-full md:w-[calc(100%-300px)]  flex flex-col px-3">
                    <div className=" w-full flex mb-2 justify-between items-center">
                        <div className="sm:h-[70px] h-[40px] w-[80px] sm:w-[140px] overflow-hidden rounded-lg" ><CSkeleton/></div>
                        <div className=" flex items-center w-[50px] sm:w-[100px] h-[30px] rounded-lg justify-between sm:text-base text-xs overflow-hidden ">
                            <CSkeleton/>
                        </div>
                        <div className=" flex flex-col w-[70px] h-[20px] rounded-lg overflow-hidden">
                            <CSkeleton/>
                        </div>
                    </div>
                </div>
                <div className=" w-full md:w-[200px] flex flex-row md:flex-col justify-center items-center px-2 pl-4 rounded">
                    <div className=" flex items-center mb-0 md:mb-[30px] order-2 md:order-1">
                        <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 overflow-hidden">
                            <CSkeleton/>
                        </div>
                        <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1  overflow-hidden">
                            <CSkeleton/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkeltonOrders;