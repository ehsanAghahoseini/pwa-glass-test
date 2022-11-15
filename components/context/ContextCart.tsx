

import React, { useEffect, useState } from 'react'

export const ContextCart = React.createContext<any>({})


export default function ContextCartModels(props: any) {
  const [cardList, setCardList] = useState<any>([])
  const [cardLength, setCardLength] = useState<any>(0)


  return (
    <ContextCart.Provider value={{
      cardList,
      setCardList,
      cardLength,
      setCardLength

    }}>
      {props.children}
    </ContextCart.Provider>
  )
}

