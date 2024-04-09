import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './style.module.scss'
import { YouTubePlayerRef, YouTubePlayer } from '../YoutubePlayer'
import { TimeBar } from './TimeBar'
import { Controls } from './Controls/index'
import { Options } from './Options'
import { collectionBackground } from '@/assets'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Track } from '@/types/track'

interface PlaybackBarProps {
    track?: Track
}

export const PlaybackBar = ({ track }: PlaybackBarProps) => {
    const youtubePlayerRef = useRef<YouTubePlayerRef>(null)
    const { } = usePlayback()
    const [currentTime, setCurrentTime] = useState(0)
    const [finalTime, setFinalTime] = useState(0)
    const [isHoldingTimeBar, setIsHoldingTimeBar] = useState(false)

    const handleTimeBarChange = (seconds: number, allowSeekAhead: boolean = false) => {
        setCurrentTime(seconds)
        youtubePlayerRef.current?.seekTo(seconds, allowSeekAhead)
    }

    const handleTimeBarMouseDown = () => {
        setIsHoldingTimeBar(true)
    }

    const handleTimeBarMouseUp = () => {
        setIsHoldingTimeBar(false)
        handleTimeBarChange(currentTime, true)
    }

    useEffect(() => {
        const getVideoDuration = () => {
            if (youtubePlayerRef.current) {
                const duration = youtubePlayerRef.current.getDuration()
                if (duration) {
                    setFinalTime(duration)
                    return
                }
            }
            setTimeout(getVideoDuration, 100)
        }
        getVideoDuration()
    }, [])

    useEffect(() => {
        const getVideoCurrentTime = () => {
            if (youtubePlayerRef.current) {
                let ct = Math.ceil(youtubePlayerRef.current.getCurrentTime())
                ct = ct >= finalTime ? finalTime : ct
                setCurrentTime(ct)
                return ct
            }

            return 0
        }

        const interval = setInterval(() => {
            if (!isHoldingTimeBar) {
                const ct = getVideoCurrentTime()
                if (ct >= finalTime) {
                    clearInterval(interval)
                }
            }
        }, 500)

        return () => clearInterval(interval)
    }, [finalTime, isHoldingTimeBar])

    return (
        <footer className={styles.playbackBar}>
            <YouTubePlayer videoId='yCzlKA5EajQ' ref={youtubePlayerRef} />
            <div className={styles.content}>
                <div className={styles.trackInfo}>
                    <div className={styles.imageBox}>
                        <Image src={collectionBackground} alt="" />
                    </div>
                    <div className={styles.info}>
                        <span className={styles.name}></span>
                        <span className={styles.albumName}>albumname</span>
                    </div>
                </div>
                <div className={styles.playerControls}>
                    <Controls youtubePlayerRef={youtubePlayerRef} />
                    <div className={styles.timerBox}>
                        <TimeBar
                            currentTime={currentTime}
                            finalTime={finalTime}
                            onChange={handleTimeBarChange}
                            onMouseDown={handleTimeBarMouseDown}
                            onMouseUp={handleTimeBarMouseUp}
                        />
                    </div>
                </div>
                <div className={styles.playerOptions}>
                    <Options youtubePlayerRef={youtubePlayerRef} />
                </div>
            </div>
        </footer>
    )
}