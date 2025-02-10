import React from 'react'
import classNames from 'classnames'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import Tilt from './components/Tilt'

interface ImageProps {
  alt: string
  src: StaticImageData | null
}

const ImageTilt = ({ alt, src }: ImageProps) => (
  <div className={classNames('margin-bottom-20', 'width-max-content')}>
    <Tilt>
      {src && <Image alt={alt} src={src} />}
    </Tilt>
  </div>
)

export default ImageTilt
