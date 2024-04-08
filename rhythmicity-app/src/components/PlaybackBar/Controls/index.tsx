import { MouseEvent, RefObject, useState } from 'react'
import Image from 'next/image'

import { nextIcon, pauseIcon, playIcon, shuffleIcon, repeatIcon, repeatOneIcon } from '@/assets'
import { PlayerState, YouTubePlayerRef } from '@/components/YoutubePlayer'

import styles from './styles.module.scss'

interface ControlsProps {
    youtubePlayerRef: RefObject<YouTubePlayerRef>
}

export const Controls = ({ youtubePlayerRef }: ControlsProps) => {
    const [playBtnIcon, setPlayBtnIcon] = useState(playIcon)
    const [loopBtnIcon, setLoopBtnIcon] = useState(repeatIcon)

    const handlePlayBtnClick = () => {
        const currentState = youtubePlayerRef.current?.getPlayerState()

        if (currentState === PlayerState.PAUSED || currentState === PlayerState.CUED) {
            setPlayBtnIcon(pauseIcon)
            youtubePlayerRef.current?.playVideo()
            return
        }

        setPlayBtnIcon(playIcon)
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
            <button className={styles.previousBtn}>
                <Image src={nextIcon} alt="previous" />
            </button>
            <button className={styles.playBtn} onClick={handlePlayBtnClick}>
                <Image src={playBtnIcon} alt="play" />
            </button>
            <button className={styles.nextBtn}>
                <Image src={nextIcon} alt="next" />
            </button>
            <button className={styles.loopBtn} onClick={handleLoopBtnClick}>
                <Image src={loopBtnIcon} alt="repeat" />
            </button>
        </div>
    )
}