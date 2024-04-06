import { ChangeEvent, useEffect, useState } from 'react'
import styles from './style.module.scss'
import { secondsToMinutes } from '@/utils/conversion'

interface TimeBarProps {
    currentTime: number
    finalTime: number
    onChange: (value: number) => void
    onMouseDown?: () => void
    onMouseUp?: () => void
}

export const TimeBar = ({ currentTime, finalTime, onChange, onMouseDown, onMouseUp }: TimeBarProps) => {
    const getPercentageValue = () => {
        const result = (currentTime * 100) / finalTime
        return isNaN(result) ? 0 : result
    }

    const percentageToSeconds = (percentage: number) => (percentage * finalTime) / 100

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const seconds = percentageToSeconds(parseInt(event.target.value))
        onChange(seconds)
    }

    return (
        <div className={styles.timeBar}>
            <span className={styles.currentTime}>{secondsToMinutes(currentTime)}</span>
            <div className={styles.bar}>
                <div className={styles.sliderContainer}>
                    <div className={styles.progressBar} style={{ width: `${getPercentageValue()}%` }}></div>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={getPercentageValue()}
                        className={styles.slider}
                        onChange={handleChange}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                    />
                </div>
            </div>
            <span className={styles.finalTime}>{secondsToMinutes(finalTime)}</span>
        </div>
    )
}