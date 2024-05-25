import Image, { StaticImageData } from 'next/image'
import styles from './style.module.scss'
import { useState } from 'react'
import { playIcon } from '@/assets'
import { ExplicitSign } from '../ExplicitSign'
import Link from 'next/link'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Track } from '@/types/track'
import { SearchedTrack } from '@/types/search'
import { RowOptions } from '../RowOptions'

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
        queueController.addTrack(track)
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
            <div className={`${styles.indexCol} ${styles.col}`}>
                {isHovered
                    ? (
                        <button className={styles.playBtn} onClick={handlePlay}>
                            <Image src={playIcon} alt="play" className={styles.playIcon} />
                        </button>
                    )
                    : <span className={styles.content}>{index}</span>}
            </div>
            <div className={`${styles.titleCol} ${styles.col}`}>
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
            <div className={`${styles.albumCol} ${styles.col}`}>
                <Link href={`/albums/${album.id}`} className={styles.content}>{album.name}</Link>
            </div>
            <div className={`${styles.timeCol} ${styles.col}`}>
                <span className={styles.content}>{time}</span>
            </div>
            <div className={styles.col}>
                <RowOptions
                    showBtn={isHovered}
                    options={[]}
                />
            </div>
        </div>
    )
}