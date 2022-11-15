import CSkeleton from "./CSkeleton";


const SkeltonShopListCart = () => {

    return (
        <div className="w-full md:w-6/12  p-[5px] mb-[10px] ">
            <div className=" w-full flex sm:flex-row flex-col ">
                <div className=" w-full sm:h-[auto] h-[120px] sm:w-6/12 rounded-[10px]  overflow-hidden">
                    <CSkeleton />
                </div>
                <div className=" w-full sm:w-6/12  flex flex-row sm:flex-col sm:items-start items-center justify-between sm:justify-start sm:mt-0 mt-[7px] pl-[10px] overflow-hidden ">
                    <div className=" flex sm:flex-col flex-row sm:items-start items-center">
                        <div className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] mr-[5px] rounded-full overflow-hidden" >
                            <CSkeleton />
                        </div>

                        <h3 className=" h-[10px] sm:h-[15px] w-[100px] rounded my-[6px] overflow-hidden"><CSkeleton/></h3>
                        <div className=" h-[8px] my-1  w-[130px] sm:flex rounded hidden overflow-hidden"><CSkeleton/></div>
                    </div>
                    <div className=" h-[10px] sm:h-[15px] w-[100px] rounded sm:mt-[10px] mt-0 overflow-hidden">
                        <CSkeleton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeltonShopListCart;