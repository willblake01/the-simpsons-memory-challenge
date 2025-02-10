'use client'
import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

const Tilt = ({ children }) => {
  const tiltRef = useRef()
  useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5
    })
    return () => (tiltNode.VanillaTilt ? tiltNode.VanillaTilt.destroy() : null)
  }, [])

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

export default Tilt
