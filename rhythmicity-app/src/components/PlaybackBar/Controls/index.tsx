import { MouseEvent, RefObject, useState } from 'react'
import Image from 'next/image'

import { nextIcon, pauseIcon, playIcon, shuffleIcon, repeatIcon, repeatOneIcon } from '@/assets'
import { PlayerState, YouTubePlayerRef } from '@/components/YoutubePlayer'

import styles from './styles.module.scss'
import { usePlayback } from '@/contexts/PlaybackContext'

interface ControlsProps {
    youtubePlayerRef: RefObject<YouTubePlayerRef>
}

export const Controls = ({ youtubePlayerRef }: ControlsProps) => {
    const { queueController, currentPlayerState } = usePlayback()
    const [loopBtnIcon, setLoopBtnIcon] = useState(repeatIcon)

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

    const handleRandomBtnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.currentTarget.classList.toggle(styles.active)
    }

    const handleLoopBtnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        const btn = event.currentTarget
        if (btn.classList.contains(styles.active) && loopBtnIcon === repeatIcon) {
            setLoopBtnIcon(repeatOneIcon)
        } else if (btn.classList.contains(styles.active) && loopBtnIcon === repeatOneIcon) {
            setLoopBtnIcon(repeatIcon)
            btn.classList.remove(styles.active)
        } else {
            btn.classList.add(styles.active)
        }
    }

    return (
        <div className={styles.controls}>
            <button className={styles.randomBtn} onClick={handleRandomBtnClick}>
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
            <button className={styles.loopBtn} onClick={handleLoopBtnClick}>
                <Image src={loopBtnIcon} alt="repeat" />
            </button>
        </div>
    )
}