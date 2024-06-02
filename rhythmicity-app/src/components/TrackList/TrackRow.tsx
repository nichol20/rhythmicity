import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import { Track } from '@/types/track'
import { SearchedTrack } from '@/types/search'
import { addListIcon, playIcon } from '@/assets'
import { ExplicitSign } from '../ExplicitSign'
import { usePlayback } from '@/contexts/PlaybackContext'
import { RowOptions } from '../RowOptions'

import styles from './style.module.scss'

interface Content {
    id: string
    name: string
}

export interface TrackRowProps {
    index: number
    track: Track | SearchedTrack
    album: Content
    time: string
    artists: Content[]
    image: string | StaticImageData
    explicit: boolean
}

export const TrackRow = ({ album, artists, index, image, explicit, time, track }: TrackRowProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const { queueController } = usePlayback()

    const handlePlay = () => {
        queueController.playNow(track)
    }

    const getTrackTitle = () => {
        if ("spotify" in track) return track.spotify.title
        return track.name
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
                    <Image src={image} alt={getTrackTitle()} width={40} height={40} />
                    <div className={styles.infoBox}>
                        <Link href={`/tracks/${track.id}`} className={styles.title}>{getTrackTitle()}</Link>
                        <span className={styles.description}>
                            {explicit ? (
                                <ExplicitSign />
                            ) : null}
                            <span className={styles.artists}>
                                {artists.map(a =>
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
                <Link href={`/albums/${album.id}`} className={styles.content}>{album.name}</Link>
            </div>
            <div className={`${styles.timeRow} ${styles.row}`}>
                <span className={styles.content}>{time}</span>
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