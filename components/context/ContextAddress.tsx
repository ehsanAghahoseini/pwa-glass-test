

import React, { useEffect, useState } from 'react'

export const ContextAddress = React.createContext<any>({})


export default function ContextAddressModels(props: any) {
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [listAddress, setListAddress] = useState<any>([])



  return (
    <ContextAddress.Provider value={{
      selectedAddress,
      setSelectedAddress,
      listAddress ,
      setListAddress
    }}>
      {props.children}
    </ContextAddress.Provider>
  )
}

