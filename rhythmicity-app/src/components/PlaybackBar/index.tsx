import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Track } from '@/types/track'
import { SearchedTrack } from '@/types/search'
import { playback } from '@/utils/api'
import { YouTubePlayerRef, YouTubePlayer, PlayerEvent, PlayerState } from '../YoutubePlayer'
import { TimeBar } from './TimeBar'
import { Controls } from './Controls/index'
import { Options } from './Options'
import { usePlayback } from '@/contexts/Playback'

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
        setTrackDuration
    } = usePlayback()
    const [currentYoutubeId, setCurrentYoutubeId] = useState("")

    const handleStateChange = (event: PlayerEvent) => {
        setCurrentPlayerState(event.target.getPlayerState())
        if (event.target.getPlayerState() === PlayerState.ENDED) {
            queueController.playNext()
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
                return track.album.name
            }

            return track.album.name
        }

        return ""
    }

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