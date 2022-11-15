import React , {useState , useEffect , useContext} from "react"
import { ContextCart } from '../../../components/context/ContextCart';
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"





const Result = () => {
    const Routing = useRouter();
    const CtCard = React.useContext(ContextCart);
    const [status, setStatus] = useState(0);


    useEffect(() => {
        if (Routing.query.status == 'true') {
            // پرداخت موفق
            localStorage.removeItem('cart');
            CtCard.setCardList([])
            CtCard.setCardLength(0)
            setStatus(1)
        }
        else {
            // پرداخت ناموفق
            setStatus(2)
        }

    }, [Routing.query])


    // هنوز پرداختی نشده
    // if (status === 0) {
    //     return 
    //     <div className=' w-full h-full flex justify-center items-center'>
    //         <h1>Waiting ...</h1>
    //     </div>
    // }


    return (
        <>
            {status == 1 &&
                <div className=' w-[90%] sm:w-[500px]  border border-[#0aa06e] rounded py-[20px] m-auto my-[100px] flex flex-col justify-center items-center'>
                    <img src={'/assets/media/success.png'} alt=" success" className=' w-[60px]' />
                    <span className='mt-[15px]'>Successful payment</span>
                    {/* <span className='mt-[15px] text-gray-500 text-xl'>کد پیگیری : {query.Authority}</span> */}
                    <div className=' w-full flex justify-around mt-[40px]'>
                        <Link href={'/user/order'}>
                            <button className=' px-[10px] h-[40px] text-white rounded bg-[#0aa06e]'>Orders</button>
                        </Link>
                        <Link href={'/'}>
                            <button className=' px-[10px] h-[40px] text-white rounded bg-[#0aa06e]'>Main page</button>
                        </Link>
                    </div>
                </div>
            }

            {status == 2 &&
                <div className=' w-[90%] sm:w-[500px]  border border-[#f74663] rounded py-[20px] m-auto my-[100px] flex flex-col justify-center items-center'>
                    <img src={'/assets/media/fail.png'} alt=" success" className=' w-[60px]' />
                    <span className='mt-[15px]'>Unsuccessful payment</span>
                    <div className=' w-full flex justify-around mt-[40px]'>
                        <Link href={'/cart'} >
                            <button className=' px-[10px] h-[40px] text-white rounded bg-[#f74663]'>Pay again</button>
                        </Link>
                        <Link href={'/'}>
                            <button className=' px-[10px] h-[40px] text-white rounded bg-[#f74663]'>Main page</button>
                        </Link>
                    </div>
                </div>
            }

        </>
    )
}

export default Result;