

import React, { useEffect, useState } from 'react'

export const ContextFilter = React.createContext<any>({})


export default function ContextFilterModels(props:any) {
  const [categoryFilter , setCategoryFilter]=useState<any>({})

  return (
    <ContextFilter.Provider value={{categoryFilter , setCategoryFilter}}>
      {props.children}
    </ContextFilter.Provider>
  )
}

