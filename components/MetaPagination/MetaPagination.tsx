

import React, { useEffect, useState } from 'react'
import { MetaPaginationProps } from '../../types/type-props/MetaPaginationProps'
import { useRouter } from 'next/router'

export default function MetaPagination({ metaPage, setMetaPage , path }: MetaPaginationProps) {
  const [listPagination, setListPagination] = useState([])
  const router = useRouter()

  const changePage = (num: string) => {
    let parms: any = null;
    router.query.page = `${num}`
    Object.entries(router.query).map((item: any, index) => {
      parms == null ?
        parms = `${item[0]}=${item[1]}`
        :
        parms = `${parms}&${item[0]}=${item[1]}`
        
    })
    router.push(`/${path}/?${parms}`)
    // router.push({
    //   pathname: router.asPath, // to get the current route (`products/music`)
    //   query: { page: num },
    // });
  }

  useEffect(() => {
    if (metaPage) {
      
      let data: any = [];
      for (let i = 1; i <= metaPage.last_page; i++) {
        data.push(i)
      }      
      setListPagination(data)
    }
  }, [metaPage])

  return (
    <div className=" w-full h-[50px] mt-[40px] flex justify-center items-center">
      {listPagination.map((item: any, index: any) =>
        <>
          <div onClick={() => changePage(item)} className={`w-[30px] h-[30px] rounded-full bg-[#E7F5ED] flex justify-center items-center mx-1 cursor-pointer border-gr-300 ${router.query.page == item && 'border'}`}>{item}</div>
        </>
      )}
    </div>
  )
}


