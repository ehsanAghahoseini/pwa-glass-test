import * as React from "react";

interface IAllowNotificationLayerProps {
  isVis: boolean;
  seiVist: CallableFunction;
}

const AllowNotificationLayer: React.FunctionComponent<
  IAllowNotificationLayerProps
> = ({ isVis, seiVist}) => {
  return (
    <div
      className={` fixed top-0 right-0 w-full bottom-0 left-0 flex flex-col justify-center items-center pt-[100px] bg-[#0000006b] backdrop-blur-sm text-2xl text-white 
    ${isVis ? "visible opacity-100 " : " invisible opacity-0 "}`}
    >
      <span onClick={()=>{seiVist(false) }} className=" absolute top-8 right-6 cursor-pointer "> close </span>
      <svg x="0px" y="0px" viewBox="0 0 15 15" className="fill-white w-[150px] hidden md:block"
      >
        <use xlinkHref="/assets/svg/arrow-top-left.svg#arrow-top-left" />
      </svg>
      <h3 className=" text-center px-4">
        To Use The ChatBox We Need you Allow the Browser Notification
      </h3>
      <svg x="0px" y="0px" viewBox="0 0 50.454 50.454" className="fill-white w-[100px] block md:hidden mt-8 rotate-180"
      >
        <use xlinkHref="/assets/svg/arrow-up.svg#arrow-bottom" />
      </svg>
    </div>
  );
};

export default AllowNotificationLayer;
