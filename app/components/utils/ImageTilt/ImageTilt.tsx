import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Tilt from './components/Tilt'

interface ImageProps {
  alt: string
  src: StaticImageData | string | null
}

const ImageTilt = ({ alt, src }: ImageProps) => (
  <Tilt>
    {src && (
      <div
        style={{
          position: 'relative',
          width: 364,
          height: 448
        }}
      >
        <Image
          alt={alt}
          src={src}
          fill
          unoptimized
          priority
          sizes="520px"
          style={{ objectFit: 'contain' }}
        />
      </div>
    )}
  </Tilt>
)

export default ImageTilt
