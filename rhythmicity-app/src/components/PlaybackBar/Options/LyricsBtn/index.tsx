import Image from 'next/image'
import styles from './style.module.scss'
import { lyricsIcon } from '@/assets'
import { Modal } from '@/components/Modal'
import React, { useState } from 'react'

interface LyricsBtnProps {
    lyrics?: string | null
}

export const LyricsBtn = ({ lyrics }: LyricsBtnProps) => {
    const [showLyrics, setShowLyrics] = useState(false)

    lyrics = lyrics ? lyrics : "We don't have the lyrics to this song. Sorry!"

    return (
        <div className={styles.container}>
            <button className={styles.lyricsBtn} onClick={() => setShowLyrics(true)}>
                <Image src={lyricsIcon} alt="lyrics" />
            </button>
            {showLyrics && <Modal onClose={() => setShowLyrics(false)}>
                <div className={styles.lyrics}>
                    {lyrics.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </Modal>}
        </div>
    )
}