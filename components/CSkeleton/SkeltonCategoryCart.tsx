import CSkeleton from "./CSkeleton";


const SkeltonCategoryCart = () => {



    return (
        <div className=" w-full md:w-[33.33%] px-1 ">
            <div className="h-[120px] md:h-[180px] rounded-[5px] sm:rounded-[15px] md:rounded-[35px] mb-1 md:mb-0 overflow-hidden">
                <CSkeleton />
            </div>
        </div>

    )
}

export default SkeltonCategoryCart;