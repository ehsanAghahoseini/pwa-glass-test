import CSkeleton from "./CSkeleton";


const SkeltonAddressList = () => {

    return (
        <div className=" w-full py-[15px] items-center mb-6  border-b flex md:flex-row flex-col overflow-hidden">
            <div className=" md:w-[85%] w-full  flex items-center px-4 ">
                <div className=" w-[20px] h-[20px] rounded-full   flex justify-center items-center overflow-hidden">
                    <CSkeleton />
                </div>
                <div className=" w-[20px] h-[20px] rounded-full overflow-hidden mx-3">
                    <CSkeleton />
                </div>
                <span className=" w-[calc(100%-60px)] h-[20px] text-gray-500 overflow-hidden ">
                    <CSkeleton />
                </span>
            </div>
            <div className=" md:w-[15%] w-full md:mt-[0] mt-[10px]  px-4  flex items-center justify-end">
                <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 overflow-hidden ">
                    <CSkeleton />
                </div>
                <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 overflow-hidden ">
                    <CSkeleton />
                </div>
                <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 overflow-hidden ">
                    <CSkeleton />
                </div>

            </div>
        </div>
    )
}

export default SkeltonAddressList;