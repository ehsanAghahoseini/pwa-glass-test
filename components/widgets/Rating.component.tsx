
import React , {useEffect} from "react";

interface IRatingComponent {
    rateNumber: number,
}

const RatingComponent: React.FunctionComponent<IRatingComponent> = ({ rateNumber }) => {

    return (
        <>
            {rateNumber &&
                < div title={`rate of review ${rateNumber}`} className=" flex ">
                    {[0, 0, 0, 0, 0].map((item: any, index: any) =>
                        <>
                            {index + 1 <= rateNumber ?
                                <img key={index} src="/assets/svg/star.svg" alt="icon" className=" sm:w-[20px] w-[15px] mr-1" />
                                :
                                <img key={index} src="/assets/svg/star-empty.svg" alt="icon" className=" sm:w-[20px] w-[15px] mr-1" />
                            }
                        </>
                    )}
                </div>
            }
        </>
    )
};

export default RatingComponent