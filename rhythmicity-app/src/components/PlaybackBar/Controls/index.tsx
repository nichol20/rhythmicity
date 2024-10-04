import { RefObject } from 'react'
import Image from 'next/image'

import { nextIcon, pauseIcon, playIcon, shuffleIcon, repeatIcon, repeatOneIcon } from '@/assets'
import { PlayerState, YouTubePlayerRef } from '@/components/YoutubePlayer'
import { PlaybackMode, usePlayback } from '@/contexts/Playback'

import styles from './styles.module.scss'

interface ControlsProps {
    youtubePlayerRef: RefObject<YouTubePlayerRef>
}

export const Controls = ({ youtubePlayerRef }: ControlsProps) => {
    const { queueController, currentPlayerState, playbackMode, setPlaybackMode } = usePlayback()

    const getPlayBtnIcon = () => {
        if (currentPlayerState === PlayerState.PLAYING || currentPlayerState === PlayerState.BUFFERING) {
            return pauseIcon
        }

        return playIcon
    }

    const handlePlayBtnClick = () => {
        const currentState = youtubePlayerRef.current?.getPlayerState()

        if (currentState === PlayerState.PAUSED || currentState === PlayerState.CUED) {
            youtubePlayerRef.current?.playVideo()
            return
        }

        youtubePlayerRef.current?.pauseVideo()
    }

    const handleRandomBtnClick = () => {
        if (playbackMode === PlaybackMode.RANDOM) {
            setPlaybackMode(PlaybackMode.NORMAL)
            return
        }

        setPlaybackMode(PlaybackMode.RANDOM)
    }

    const handleLoopBtnClick = () => {
        if (playbackMode === PlaybackMode.NORMAL || playbackMode === PlaybackMode.RANDOM) {
            setPlaybackMode(PlaybackMode.LOOP)
            return
        } else if (playbackMode === PlaybackMode.LOOP) {
            setPlaybackMode(PlaybackMode.LOOPONE)
            return
        }
        setPlaybackMode(PlaybackMode.NORMAL)
    }

    const getLoopBtnIcon = () => {
        if (playbackMode === PlaybackMode.LOOPONE) {
            return repeatOneIcon
        }

        return repeatIcon
    }

    const getLoopBtnClass = () => {
        if (playbackMode === PlaybackMode.LOOPONE || playbackMode === PlaybackMode.LOOP) {
            return `${styles.loopBtn} ${styles.active}`
        }

        return `${styles.loopBtn}`
    }

    const getRandomBtnClass = () => {
        if (playbackMode === PlaybackMode.RANDOM) {
            return `${styles.randomBtn} ${styles.active}`
        }

        return `${styles.randomBtn}`
    }


    return (
        <div className={styles.controls}>
            <button className={getRandomBtnClass()} onClick={handleRandomBtnClick}>
                <Image src={shuffleIcon} alt="random" />
            </button>
            <button className={styles.previousBtn} onClick={queueController.resetTime}>
                <Image src={nextIcon} alt="previous" />
            </button>
            <button className={styles.playBtn} onClick={handlePlayBtnClick}>
                <Image src={getPlayBtnIcon()} alt="play" />
            </button>
            <button className={styles.nextBtn} onClick={queueController.playNext}>
                <Image src={nextIcon} alt="next" />
            </button>
            <button className={getLoopBtnClass()} onClick={handleLoopBtnClick}>
                <Image src={getLoopBtnIcon()} alt="repeat" />
            </button>
        </div>
    )
}