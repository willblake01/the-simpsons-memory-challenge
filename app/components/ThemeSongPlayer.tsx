'use client'
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { LargeButton } from './utils'

type ThemeSongPlayerProps = {
  themeSongRef: React.MutableRefObject<HTMLAudioElement | null>;
};

const ThemeSongPlayer: React.FC<ThemeSongPlayerProps> = ({ themeSongRef }) => {
  const [playPauseButtonText, setPlayPauseButtonText] = useState<string>('Play Song')
  const [isSongPaused, setIsSongPaused] = useState(false)
  const [isSongPlaying, setIsSongPlaying] = useState(false)

  const play = (): void => {
    if (!isSongPlaying) {
      Promise.all([setIsSongPaused(false), setIsSongPlaying(true)]).then(() =>
        themeSongRef.current?.play()
      )
    }
  }

  const pause = (): void => {
    if (isSongPlaying) {
      Promise.all([setIsSongPaused(true), setIsSongPlaying(false)]).then(() =>
        themeSongRef.current?.pause()
      )
    }
  }

  const stop = useCallback((): void => {
    Promise.all([setIsSongPaused(false), setIsSongPlaying(false)]).then(() =>
      themeSongRef.current?.load()
    )
  }, [setIsSongPaused, setIsSongPlaying, themeSongRef])

  const handlePlayPauseActions: () => void = isSongPlaying && !isSongPaused ? pause : play

  useEffect(() => {
    const handleButtonText = (): void => isSongPlaying ? setPlayPauseButtonText('Pause Song') : setPlayPauseButtonText(isSongPaused ? 'Play Song' : 'Theme Song')

    handleButtonText()
  }, [isSongPlaying, isSongPaused])

  useEffect(() => {
    stop()
  }, [setIsSongPaused, setIsSongPlaying, themeSongRef, stop])

  useEffect(() => {
    const audio = themeSongRef.current
    if (!audio) return

    const handleAudioEnded = () => {
      stop();
    }

    audio?.addEventListener('ended', handleAudioEnded)

    return () => {
      audio?.removeEventListener('ended', handleAudioEnded)
    }
  }, [stop, themeSongRef])

  return (
    <>
      {
        isSongPlaying || isSongPaused ? (
          <div
            className={classNames(
              'align-center',
              'flex-row',
              'justify-center',
              'width-max-content'
            )}
          >
            <LargeButton
              className='large-button'
              onClick={handlePlayPauseActions}
              text={playPauseButtonText}
            />
            <LargeButton
              className='large-button'
              onClick={stop}
              text={'Stop Song'}
            />
          </div>
        ) : (
          <div
            className={classNames(
              'align-center',
              'flex-row',
              'justify-center',
              'width-max-content'
            )}
          >
            <LargeButton
              className='large-button'
              onClick={handlePlayPauseActions}
              text={playPauseButtonText}
            />
          </div>
        )
      }
    </>
  )
}

export default ThemeSongPlayer
