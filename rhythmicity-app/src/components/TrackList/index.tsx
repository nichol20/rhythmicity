import { ReactNode } from 'react'
import Image from 'next/image'

import { TrackRow } from './TrackRow'
import { watchIcon } from '@/assets'

import styles from './style.module.scss'

export interface TrackListProps {
    children: ReactNode
}

const TrackList = ({ children }: TrackListProps) => {
    return (
        <div className={styles.trackList}>
            <div className={styles.header}>
                <div className={`${styles.indexCol} ${styles.col}`}>
                    <span className={styles.content}>#</span>
                </div>
                <div className={`${styles.titleCol} ${styles.col}`}>
                    <span className={styles.content}>title</span>
                </div>
                <div className={`${styles.albumCol} ${styles.col}`}>
                    <span className={styles.content}>album</span>
                </div>
                <div className={`${styles.timeCol} ${styles.col}`}>
                    <Image className={styles.watchIcon} src={watchIcon} alt="watch" />
                </div>
            </div>
            <div className={styles.rows}>
                {children}
            </div>
        </div>
    )
}

export {
    TrackList,
    TrackRow
}