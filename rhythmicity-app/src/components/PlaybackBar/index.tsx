import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './style.module.scss'
import { YouTubePlayerRef, YouTubePlayer, PlayerEvent, PlayerState } from '../YoutubePlayer'
import { TimeBar } from './TimeBar'
import { Controls } from './Controls/index'
import { Options } from './Options'
import { collectionBackground } from '@/assets'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Track } from '@/types/track'
import { SearchedTrack } from '@/types/search'
import { playback } from '@/utils/api'

interface PlaybackBarProps {
    track?: Track | SearchedTrack | null
}

export const PlaybackBar = ({ track }: PlaybackBarProps) => {
    const youtubePlayerRef = useRef<YouTubePlayerRef>(null)
    const { playNext, cleanQueue } = usePlayback()
    const [currentTime, setCurrentTime] = useState(0)
    const [finalTime, setFinalTime] = useState(0)
    const [isHoldingTimeBar, setIsHoldingTimeBar] = useState(false)
    const [currentYoutubeId, setCurrentYoutubeId] = useState("")

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


    const handleStateChange = (event: PlayerEvent) => {
        console.log(event.target.getPlayerState())
        if (event.target.getPlayerState() === PlayerState.ENDED) {
            playNext()
        }
    }

    const getTrackImage = () => {
        if (track) {
            if ("youtube" in track) {
                return track.spotify.albumImages[2]
            }

            return track.images[2]
        }

        return null
    }

    const getTrackName = () => {
        if (track) {
            if ("youtube" in track) {
                return track.spotify.title
            }

            return track.name
        }

        return ""
    }

    const getAlbumName = () => {
        if (track) {
            if ("youtube" in track) {
                return "Album"
            }

            return track.albumName
        }

        return ""
    }

    useEffect(() => {
        const getYoutubeId = async () => {
            console.log(track)
            if (track) {
                const data = await playback(track.id)
                console.log(data)
                setCurrentYoutubeId(data.youtubeId)
            }
        }
        getYoutubeId()
        console.log("getYoutubeID")
    }, [track])

    useEffect(() => {
        const playVideo = () => {
            if (youtubePlayerRef.current) {
                youtubePlayerRef.current.loadVideoById(currentYoutubeId, 0)
            }
        }
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
        playVideo()
        getVideoDuration()
    }, [currentYoutubeId])

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

    // console.log(currentYoutubeId)
    return (
        <footer className={styles.playbackBar}>
            <YouTubePlayer videoId={currentYoutubeId} ref={youtubePlayerRef} onStateChange={handleStateChange} />
            <div className={styles.content}>
                <div className={styles.trackInfo}>
                    {track && (
                        <>
                            <div className={styles.imageBox}>
                                <Image
                                    src={getTrackImage()?.url ?? ""}
                                    width={getTrackImage()?.width}
                                    height={getTrackImage()?.height}
                                    alt=""
                                />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>{getTrackName()}</span>
                                <span className={styles.albumName}>{getAlbumName()}</span>
                            </div>
                        </>
                    )}
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