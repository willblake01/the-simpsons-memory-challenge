'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Context, ContextType } from '../context'
import { LargeButton } from './utils'

const SongPlayer: React.FC = () => {
  const [playPauseButtonText, setPlayPauseButtonText] = useState<string>('Play Song')
  const {
    songIsPaused,
    setSongIsPaused,
    songIsPlaying,
    setSongIsPlaying,
    themeSongRef,
  } = useContext(Context) as unknown as ContextType

  const playSong = (): void => {
    if (!songIsPlaying) {
      Promise.all([setSongIsPaused(false), setSongIsPlaying(true)]).then(() =>
        themeSongRef.current?.play()
      )
    }
  }

  const pauseSong = (): void => {
    if (songIsPlaying) {
      Promise.all([setSongIsPaused(true), setSongIsPlaying(false)]).then(() =>
        themeSongRef.current?.pause()
      )
    }
  }

  const stopSong = useCallback((): void => {
    Promise.all([setSongIsPaused(false), setSongIsPlaying(false)]).then(() =>
      themeSongRef.current?.load()
    )
  }, [setSongIsPaused, setSongIsPlaying, themeSongRef])

  const handlePlayPauseActions: () => void = songIsPlaying && !songIsPaused ? pauseSong : playSong

  useEffect(() => {
    stopSong()
  }, [setSongIsPaused, setSongIsPlaying, themeSongRef, stopSong])

  useEffect(() => {
    const handleButtonText = (): void => songIsPlaying ? setPlayPauseButtonText('Pause Song') : setPlayPauseButtonText(songIsPaused ? 'Play Song' : 'Theme Song')

    handleButtonText()
  }, [songIsPlaying, songIsPaused])
  
  return (
    <>
      {
        songIsPlaying || songIsPaused ? (
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
