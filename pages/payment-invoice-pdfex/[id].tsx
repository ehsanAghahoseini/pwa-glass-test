import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { GetInvoiceApi } from '../../apis/orders-api/address-api';
import { DownloadInvoiceApi } from '../../apis';
import CSkeleton from '../../components/CSkeleton/CSkeleton';

type Props = {}

const Index = (props: Props) => {
    const routing = useRouter()
    const [invoice, setInvoice] = useState<any>(null)
    const [isReq, setIsReq] = useState<boolean>(true)

    const downloadInvoice = async (id: any) => {
        // setIsReq(true)
        // try {
            // const res: any = await DownloadInvoiceApi(id)
            // let reader = new FileReader();
            // reader.readAsDataURL(res);
            // reader.onload = function () {
            //     console.log(reader.result);
            // };
            // setInvoice(file)
            // var el = document.createElement("a");
            // el.setAttribute("href", res);
            // el.setAttribute("download", 'invoice');
            // el.setAttribute("target", '_blank');
            // document.body.appendChild(el);
            // el.click();
            // el.remove();
        //     setIsReq(false)
        // } catch {
        //     setIsReq(false)
        // }
    };

    // const getInvoice = async (id: any) => {
    //     setIsReq(true)
    //     try {
    //         const res: any = await GetInvoiceApi(id)
    //         setInvoice(res)
    //         setIsReq(false)
    //     } catch {
    //         setIsReq(false)
    //     }
    // };

    useEffect(() => {
        const id = routing.query.id
        if (id) {
            downloadInvoice(id)
        }
    }, [routing.query.id])


    return (

        <>
            {isReq ?
                <div
                    className=' w-full max-w-screen-lg mx-auto flex flex-col items-center p-6 bg-slate-50 rounded-lg my-10 overflow-hidden min-h-[600px]'>
                    <CSkeleton />
                </div>
                :
                <div  >
 
                </div>
            }

        </>

    )
}

export default Index