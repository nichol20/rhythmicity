import { ChangeEvent, useEffect, useState } from 'react'
import styles from './style.module.scss'
import { secondsToMinutes } from '@/utils/conversion'
import { Slider } from '@/components/Slider'
import { usePlayback } from '@/contexts/PlaybackContext'


export const TimeBar = () => {
    const {
        currentBarTime,
        setCurrentBarTime,
        trackDuration,
        playerRef
    } = usePlayback()
    const [isHolding, setIsHolding] = useState(false)

    const getPercentageValue = () => {
        const result = (currentBarTime * 100) / trackDuration
        return isNaN(result) ? 0 : result
    }

    const percentageToSeconds = (percentage: number) => (percentage * trackDuration) / 100

    const changeTime = (seconds: number, allowSeekAhead: boolean) => {
        setCurrentBarTime(seconds)
        playerRef?.current?.seekTo(seconds, allowSeekAhead)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const seconds = percentageToSeconds(parseInt(event.target.value))
        changeTime(seconds, false)
    }

    const handleMouseDown = () => {
        setIsHolding(true)
    }

    const handleMouseUp = () => {
        setIsHolding(false)
        changeTime(currentBarTime, true)
    }

    useEffect(() => {
        const getVideoCurrentTime = () => {
            if (playerRef?.current) {
                let ct = Math.ceil(playerRef.current.getCurrentTime())
                ct = ct >= trackDuration ? trackDuration : ct
                setCurrentBarTime(ct)
                return ct
            }

            return 0
        }

        const interval = setInterval(() => {
            if (!isHolding) {
                const ct = getVideoCurrentTime()
                if (ct >= trackDuration) {
                    clearInterval(interval)
                }
            }
        }, 500)

        return () => clearInterval(interval)
    }, [trackDuration, isHolding, setCurrentBarTime, playerRef])

    return (
        <div className={styles.timeBar}>
            <span className={styles.currentTime}>{secondsToMinutes(currentBarTime)}</span>
            <Slider
                value={getPercentageValue()}
                progressBarWidth={`${getPercentageValue()}%`}
                onChange={handleChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
            <span className={styles.finalTime}>{secondsToMinutes(trackDuration)}</span>
        </div>
    )
}