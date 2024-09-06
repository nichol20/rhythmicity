import { msToMinutes } from '@/utils/conversion'
import { usePlayback } from '@/contexts/PlaybackContext'
import { BestResultCard } from '../BestResultCard'
import { BestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from '@/types/search'
import { TrackRow, TrackRowFallback } from '@/components/TrackList'

import styles from './style.module.scss'
import { CardFallback } from '@/components/Card/CardFallback'
import { HighlightedMessage } from '@/components/HighlightedMessage'

export interface MainResultsProps {
    bestResult?: BestResult | null
    tracks: SearchedTrack[]
    showFallback?: boolean
}

export const MainResults = ({ bestResult, tracks, showFallback = false }: MainResultsProps) => {
    const { queueController } = usePlayback()

    const handlePlay = (obj: SearchedTrack | SearchedAlbum | SearchedArtist) => {
        if (obj.type === "track") queueController.playNow(obj)
        else if (obj.type === "artist") queueController.playArtist(obj)
        else queueController.playAlbum(obj)
    }

    const TrackList = () => {
        if (showFallback) {
            return Array(5).fill("").map((_, i) => {
                return <TrackRowFallback key={i} />
            })
        }

        if (tracks.length === 0) {
            return (
                <HighlightedMessage message='No tracks found' />
            )
        }

        return tracks.map((track, i) => {
            if (i < 5) {
                return <TrackRow key={track.id} index={i + 1} track={track} />
            }
        })
    }

    return (
        <section className={styles.mainResults}>
            <div className={styles.bestResultBox}>
                <h3 className={styles.title}>Best Result</h3>
                {showFallback
                    ? <CardFallback kind='big' />
                    : (bestResult && <BestResultCard bestResult={bestResult} onPlay={handlePlay} />)}
            </div>
            <div className={styles.tracksBox}>
                <h3 className={styles.title}>Tracks</h3>
                <div className={styles.tracks}>
                    <TrackList />
                </div>
            </div>
        </section>
    )
}