import React, { useState } from 'react'
import Image from 'next/image'

import { lyricsIcon } from '@/assets'
import { Modal } from '@/components/Modal'
import { usePlayback } from '@/contexts/Playback'

import styles from './style.module.scss'

export const LyricsBtn = () => {
    const [showLyrics, setShowLyrics] = useState(false)
    const { currentTrack } = usePlayback()
    const lyrics = currentTrack?.lyrics ? currentTrack.lyrics : "We don't have the lyrics to this song. Sorry!"
    // some lyrics are separated with \n and others with \\n
    const lyricsArr = lyrics.includes("\\n") ? lyrics.split("\\n") : lyrics.split("\n")

    return (
        <div className={styles.container}>
            <button className={styles.lyricsBtn} onClick={() => setShowLyrics(true)}>
                <Image src={lyricsIcon} alt="lyrics" />
            </button>
            {showLyrics && <Modal close={() => setShowLyrics(false)}>
                <div className={styles.lyrics}>
                    {lyricsArr.map((line, index) => {
                        return (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        )
                    })}
                </div>
            </Modal>}
        </div>
    )
}