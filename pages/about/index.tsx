import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

interface IIndexProps {

}

const Index: NextPage<IIndexProps> = (props) => {

    return (
        <div className=' flex flex-col w-full pt-10 pb-14 min-h-[calc(100vh-300px)] max-w-screen-md mx-auto px-6'>
            <img src='/assets/about-logo.png' className=' w-full max-w-[100px] md:max-w-[150px] mb-6 mx-auto' />
            <p className=' w-full text-justify max-w-screen-md mx-auto mb-4'>
                Optic4Less is an online platform that bridges the gap between optical wear manufacturers, retailers and consumers. We are a one stop shop providing a platform to showcase optical wear (luxury & standard) for quick and seamless transactions. Choose from a vast collection of eyewear, select and check out your order.
            </p>
            <Link href={"/term-conditions"}>
                <a className=' text-gr-300 mt-6 cursor-pointer'>
                    Term & Conditions
                </a>
            </Link>
            <Link href={"/privacy-policy"}>
                <a className=' text-gr-300 mt-6 cursor-pointer'>
                    Privacy Policy
                </a>
            </Link>
        </div>
    );
};

export default Index;
