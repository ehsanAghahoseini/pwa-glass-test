

import React, { useEffect, useState } from 'react'

export const ContextFavorite = React.createContext<any>({})


export default function ContextFavoriteModels(props:any) {
  const [favorite , setFavorite]=useState<any>(0)

  return (
    <ContextFavorite.Provider value={{favorite , setFavorite}}>
      {props.children}
    </ContextFavorite.Provider>
  )
}

