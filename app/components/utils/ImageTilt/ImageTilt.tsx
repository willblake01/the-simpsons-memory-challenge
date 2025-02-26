import React from 'react'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import Tilt from './components/Tilt'

interface ImageProps {
  alt: string
  height?: number
  width?: number
  src: StaticImageData | string | null
}

const ImageTilt = ({ alt, height, src, width }: ImageProps) => (
  <Tilt>
    {src && <Image alt={alt} height={height} priority src={src} width={width} />}
  </Tilt>
)

export default ImageTilt
