

import React, { useEffect, useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { CImageProps } from '../../types/type-props/CImageProps'
import CSkeleton from '../CSkeleton/CSkeleton'

export default function CImage({ src, alt, className, placeholder_height }: CImageProps) {
  const [loadImage, setLoadImage] = useState<boolean>(false)

  return (
    <>
      <LazyLoadImage
        placeholder={<div className="w-full rounded-[10px] overflow-hidden sm:rounded-[15px] md:rounded-[35px]"><CSkeleton /></div>}
        effect={"blur"}
        alt={alt}
        src={src}
        width={"100%"}
        className={className}
      />
      {/*     
    <img onLoadStartCapture={() => { setLoadImage(true) }} onLoad={() => { setLoadImage(false) }} src={src} alt={alt} className={className} />
      {loadImage == true &&
        <div style={{height:placeholder_height}} className=" w-full bg-gr-400 rounded overflow-hidden flex justify-center items-center absolute top-0" />
      } */}
    </>
  )
}

