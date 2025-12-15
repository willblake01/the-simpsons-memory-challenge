'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { StaticImageData } from 'next/image'
import { Context, ContextType } from '../context'
import { ImageTilt, LargeButton } from '../components/utils'
import lisa from '../public/images/lisa.png'
import moe from '../public/images/moe.png'
import nelson from '../public/images/nelson.png'

const Score = () => {
  const router = useRouter()

  const {
      goal, rawList, score, setScore
    } = useContext(Context) as unknown as ContextType
  
  const [imageSource, setImageSource] = useState<StaticImageData | null>(null)
  const [imageHeadline, setImageHeadline] = useState('')
  const [imageAltText, setImageAltText] = useState('')

  const didntTry = score === 0
  const didntHitGoal = rawList?.length && rawList?.length < goal
  const hitGoal = rawList?.length >= goal

  const calculateScore = useCallback(() => {

    // A player must reach their goal to score points.
    if (rawList?.length >= goal) {

      // Base score is 10 points per item in the goal.
      const baseScore = goal * 10
      
      // Additional 1 point bonus for each item over the goal.
      const additionalScore = rawList?.length - goal
      const totalScore = baseScore + additionalScore
    
      setScore(totalScore)
    }
  }, [goal, rawList, setScore])

  const handleImageData = useCallback(() => {
    if (didntTry) {
      setImageHeadline("Come on now, you didn't even try.")
      setImageSource(nelson)
      setImageAltText('Nelson Muntz')
    }
    if (didntHitGoal) {
      setImageHeadline('Smh. Try to hit your goal next time...')
      setImageSource(moe)
      setImageAltText('Moe Szyslak')
    }
    if (hitGoal) {
      setImageHeadline(`Score: ${score}`)
      setImageSource(lisa)
      setImageAltText('Lisa Simpson')
    }
  }, [didntTry, didntHitGoal, hitGoal, score])

  const restartChallenge = () => {
    router.push('/')
  }

  useEffect(() => {
    calculateScore()
    handleImageData()
  }, [calculateScore, handleImageData, rawList, score])

  return (
    <div
      className={classNames(
        'flex-column',
        'align-center',
      )}
    >
      <div className={classNames('align-center', 'flex-column', 'margin-bottom-20', 'width-max-content')}>
        <div className='margin-bottom-20'>
          <h1>{imageHeadline}</h1>
        </div>
        <ImageTilt alt={imageAltText} src={imageSource} />
      </div>
      <LargeButton
        text='Restart Challenge'
        className='large-button'
        onClick={restartChallenge}
      />
    </div>
  )
}

export default Score
