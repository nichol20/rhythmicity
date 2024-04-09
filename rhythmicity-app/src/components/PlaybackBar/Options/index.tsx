import { RefObject } from 'react'
import Image from 'next/image'

import { YouTubePlayerRef } from '@/components/YoutubePlayer'
import { Volume } from './Volume'
import styles from './style.module.scss'
import { LyricsBtn } from './LyricsBtn'

interface ControlsProps {
    youtubePlayerRef: RefObject<YouTubePlayerRef>
}

export const Options = ({ youtubePlayerRef }: ControlsProps) => {


    return (
        <div className={styles.options}>
            <LyricsBtn />
            <Volume youtubePlayerRef={youtubePlayerRef} />
        </div>
    )
}