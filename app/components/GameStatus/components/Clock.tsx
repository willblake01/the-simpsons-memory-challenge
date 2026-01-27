'use client'
import React, { useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Context, ContextType } from '@/app/context'
import { msToTime } from '@/app/utils/MSToTotalTime'

const Clock = () => {
  const SOUND_EFFECT_SRC = '/audio/warning_sound.mp3'

  const soundEffectRef = useRef<HTMLAudioElement | null>(null)

  const context = useContext(Context)

  if (!context) {
    throw new Error("Clock must be used within a ContextProvider")
  }

  const { clock, setClock } = context as unknown as ContextType

  useEffect(() => {
    soundEffectRef.current = new Audio(SOUND_EFFECT_SRC)
    soundEffectRef.current.preload = 'auto'
    soundEffectRef.current.volume = 0.5

    return () => {
      soundEffectRef.current?.pause()
      soundEffectRef.current = null
    }
  }, [soundEffectRef])

  const playWarningSound = () => {
    const audio = soundEffectRef.current
    if (!audio) return

    audio.currentTime = 0
    audio.play().catch(() => {
      console.log('Something went wrong with audio')
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (clock > 0) {
        setClock(clock - 1000)
      }

      if (clock === 120000) {
        playWarningSound()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [clock, setClock])

  const isUnderTwoMinutes = clock <= 120_000

  return (
    <div
      className={classNames('flex-column', 'justify-center', 'align-center')}
    >
      <h1>Clock</h1>
      {
        <h1 className={classNames({
          'text-red-600': isUnderTwoMinutes,
          'clock-pulse': isUnderTwoMinutes
        })}>
          {msToTime(clock)}
        </h1>
      }
    </div>
  )
}

export default Clock
