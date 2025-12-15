'use client'
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { LargeButton } from './utils'

interface SongPlayerProps {
  themeSongRef: React.MutableRefObject<HTMLAudioElement | undefined>
}

const SongPlayer: React.FC<SongPlayerProps> = ({ themeSongRef }) => {
  const [playPauseButtonText, setPlayPauseButtonText] = useState<string>('Play Song')
  const [isSongPaused, setIsSongPaused] = useState(false)
  const [isSongPlaying, setIsSongPlaying] = useState(false)

  const playSong = (): void => {
    if (!isSongPlaying) {
      Promise.all([setIsSongPaused(false), setIsSongPlaying(true)]).then(() =>
        themeSongRef.current?.play()
      )
    }
  }

  const pauseSong = (): void => {
    if (isSongPlaying) {
      Promise.all([setIsSongPaused(true), setIsSongPlaying(false)]).then(() =>
        themeSongRef.current?.pause()
      )
    }
  }

  const stopSong = useCallback((): void => {
    Promise.all([setIsSongPaused(false), setIsSongPlaying(false)]).then(() =>
      themeSongRef.current?.load()
    )
  }, [setIsSongPaused, setIsSongPlaying, themeSongRef])

  const handlePlayPauseActions: () => void = isSongPlaying && !isSongPaused ? pauseSong : playSong

  useEffect(() => {
    const handleButtonText = (): void => isSongPlaying ? setPlayPauseButtonText('Pause Song') : setPlayPauseButtonText(isSongPaused ? 'Play Song' : 'Theme Song')

    handleButtonText()
  }, [isSongPlaying, isSongPaused])

  useEffect(() => {
    stopSong()
  }, [setIsSongPaused, setIsSongPlaying, themeSongRef, stopSong])

  useEffect(() => {
    const audio = themeSongRef.current
    if (!audio) return

    const handleSongEnded = () => {
      setIsSongPlaying(false)
    }

    audio?.addEventListener('ended', handleSongEnded)

    return () => {
      audio?.removeEventListener('ended', handleSongEnded)
    }
  }, [])
  
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
              className="large-button"
              onClick={handlePlayPauseActions}
              text={playPauseButtonText}
            />
            <LargeButton
              className="large-button"
              onClick={stopSong}
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
              className="large-button"
              onClick={handlePlayPauseActions}
              text={playPauseButtonText}
            />
          </div>
        )
      }
    </>
  )
}

export default SongPlayer
