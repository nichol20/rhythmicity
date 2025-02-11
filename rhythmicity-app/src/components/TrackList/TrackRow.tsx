"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { Track } from '@/types/track'
import { SearchedTrack } from '@/types/search'
import { addListIcon, playIcon } from '@/assets'
import { ExplicitSign } from '../ExplicitSign'
import { usePlayback } from '@/contexts/Playback'
import { RowOptions } from '../RowOptions'

import styles from './style.module.scss'
import { msToMinutes } from '@/utils/conversion'
import { getTrackDuration, getTrackImage, getTrackTitle } from '@/utils/track'

export interface TrackRowProps {
    index: number
    track: Track | SearchedTrack
}

export const TrackRow = ({ index, track }: TrackRowProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const { queueController } = usePlayback()

    const handlePlay = () => {
        queueController.playNow(track)
    }

    return (
        <div
            className={styles.trackRow}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`${styles.indexRow} ${styles.row}`}>
                {isHovered
                    ? (
                        <button className={styles.playBtn} onClick={handlePlay}>
                            <Image src={playIcon} alt="play" className={styles.playIcon} />
                        </button>
                    )
                    : <span className={styles.content}>{index}</span>}
            </div>
            <div className={`${styles.titleRow} ${styles.row}`}>
                <div className={styles.content}>
                    <Image src={getTrackImage(track, "big")?.url ?? ""} alt={getTrackTitle(track)} width={40} height={40} />
                    <div className={styles.infoBox}>
                        <Link href={`/tracks/${track.id}`} className={styles.title}>{getTrackTitle(track)}</Link>
                        <span className={styles.description}>
                            {track.explicit ? (
                                <ExplicitSign />
                            ) : null}
                            <span className={styles.artists}>
                                {track.artists.map(a =>
                                    <Link
                                        key={a.id}
                                        href={`/artists/${a.id}`}
                                        className={styles.artistName}
                                    >{a.name}</Link>
                                )}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={`${styles.albumRow} ${styles.row}`}>
                <Link href={`/albums/${track.album.id}`} className={styles.content}>{track.album.name}</Link>
            </div>
            <div className={`${styles.timeRow} ${styles.row}`}>
                <span className={styles.content}>{msToMinutes(getTrackDuration(track))}</span>
                <div className={styles.options}>
                    <RowOptions
                        showBtn={isHovered}
                        options={[
                            {
                                action: () => queueController.addTrack(track),
                                description: "Add to queue",
                                icon: addListIcon,
                                name: "add to queue"
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}