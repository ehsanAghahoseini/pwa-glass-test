import CSkeleton from "./CSkeleton";

const SkeltonFilterCart = () => {

    return (
        <>
            <div className=" w-full  md:w-3/12 sm:w-4/12  p-[5px] mb-[10px]">
                <div className=" w-full flex flex-col rounded overflow-hidden">
                    <div className=" w-full h-[200px] rounded overflow-hidden">
                        <CSkeleton />
                    </div>
                    <div className=" w-6/12 h-[40px] rounded overflow-hidden mt-[10px]">
                        <CSkeleton />
                    </div>
                    <div className=" w-8/12 h-[20px] rounded-[20px] overflow-hidden mt-[15px]">
                        <CSkeleton />
                    </div>
                    <div className=" w-full h-[20px] rounded-[20px] overflow-hidden mt-[5px]">
                        <CSkeleton />
                    </div>
                    <div className=" w-6/12 h-[20px] rounded-[20px] overflow-hidden mt-[15px]">
                        <CSkeleton />
                    </div>

                </div>
            </div>
        </>
    )
}

export default SkeltonFilterCart;




export const SkeltonFilterImageCart = () => {
    return (
        <>
            <div className=" w-full h-[200px] rounded overflow-hidden">
                <CSkeleton />
            </div>
        </>
    )
}
