import { RefObject } from 'react'
import Image from 'next/image'

import { YouTubePlayerRef } from '@/components/YoutubePlayer'
import { Volume } from './Volume'
import styles from './style.module.scss'
import { LyricsBtn } from './LyricsBtn'
import { queueIcon } from '@/assets'
import { usePlayback } from '@/contexts/PlaybackContext'

interface ControlsProps {
    youtubePlayerRef: RefObject<YouTubePlayerRef>
}

export const Options = ({ youtubePlayerRef }: ControlsProps) => {
    const { setShowQueue } = usePlayback()

    return (
        <div className={styles.options}>
            <LyricsBtn />
            <Volume youtubePlayerRef={youtubePlayerRef} />
            <button className={styles.option} onClick={() => setShowQueue(true)}>
                <Image src={queueIcon} alt="queue" />
            </button>
        </div>
    )
}