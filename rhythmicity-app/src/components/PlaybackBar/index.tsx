import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Track } from '@/types/track'
import { SearchedTrack } from '@/types/search'
import { playback } from '@/utils/api'
import { YouTubePlayerRef, YouTubePlayer, PlayerState, EventObject } from '../YoutubePlayer'
import { TimeBar } from './TimeBar'
import { Controls } from './Controls/index'
import { Options } from './Options'
import { PlaybackMode, usePlayback } from '@/contexts/Playback'
import { getTrackImage, getTrackTitle } from '@/utils/track'

import styles from './style.module.scss'

interface PlaybackBarProps {
    track?: Track | SearchedTrack | null
}

export const PlaybackBar = ({ track }: PlaybackBarProps) => {
    const youtubePlayerRef = useRef<YouTubePlayerRef>(null)
    const {
        queueController,
        setCurrentPlayerState,
        setPlayerRef,
        setTrackDuration,
    } = usePlayback()
    const { playNext } = queueController
    const [currentYoutubeId, setCurrentYoutubeId] = useState("")

    const handleStateChange = useCallback((event: EventObject) => {
        setCurrentPlayerState(event.target.getPlayerState())
        if (event.target.getPlayerState() === PlayerState.ENDED) {
            playNext()
        }

    }, [playNext, setCurrentPlayerState])

    useEffect(() => {
        const getYoutubeId = async () => {
            if (track) {
                const data = await playback(track.id)
                setCurrentYoutubeId(data.youtubeId)
                return
            }

            setCurrentYoutubeId("")
        }
        getYoutubeId()
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
                    setTrackDuration(duration)
                    return
                }
            }
            setTimeout(getVideoDuration, 100)
        }
        playVideo()
        getVideoDuration()
    }, [currentYoutubeId, setTrackDuration])

    useEffect(() => {
        setPlayerRef(youtubePlayerRef)
    }, [youtubePlayerRef, setPlayerRef])

    return (
        <footer className={styles.playbackBar}>
            <YouTubePlayer ref={youtubePlayerRef} onStateChange={handleStateChange} />
            <div className={styles.content}>
                <div className={styles.trackInfo}>
                    {track && (
                        <>
                            <div className={styles.imageBox}>
                                <Image
                                    src={getTrackImage(track, "small")?.url ?? ""}
                                    width={getTrackImage(track, "small")?.width}
                                    height={getTrackImage(track, "small")?.height}
                                    alt=""
                                />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>{getTrackTitle(track)}</span>
                                <span className={styles.albumName}>{track.album.name}</span>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.playerControls}>
                    <Controls youtubePlayerRef={youtubePlayerRef} />
                    <div className={styles.timerBox}>
                        <TimeBar />
                    </div>
                </div>
                <div className={styles.playerOptions}>
                    <Options youtubePlayerRef={youtubePlayerRef} />
                </div>
            </div>
        </footer>
    )
}