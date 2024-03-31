import Image, { StaticImageData } from 'next/image'
import styles from './style.module.scss'

export interface TrackRowProps {
    index: number
    title: string
    album: string
    time: string
    artists: string[]
    image: string | StaticImageData
    explicit: boolean
}

export const TrackRow = ({ album, artists, index, image, explicit, time, title }: TrackRowProps) => {
    return (
        <div className={styles.trackRow}>
            <div className={`${styles.indexCol} ${styles.col}`}>
                <span className={styles.content}>{index}</span>
            </div>
            <div className={`${styles.titleCol} ${styles.col}`}>
                <div className={styles.content}>
                    <Image src={image} alt={title} width={30} height={30} />
                    <div className={styles.infoBox}>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.artists}>{artists.join(', ')} dposajdpoasj pdjsaopd jaspojd poasj</span>
                    </div>
                </div>
            </div>
            <div className={`${styles.albumCol} ${styles.col}`}>
                <span className={styles.content}>{album}</span>
            </div>
            <div className={`${styles.timeCol} ${styles.col}`}>
                <span className={styles.content}>{time}</span>
            </div>
        </div>
    )
}