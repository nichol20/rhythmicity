import styles from './style.module.scss'
import { BestResultCard } from '../BestResultCard'
import { BestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from '@/types/search'
import { TrackRow } from '@/components/TrackList'
import { msToMinutes } from '@/utils/conversion'
import { usePlayback } from '@/contexts/PlaybackContext'

export interface MainResultsProps {
    bestResult?: BestResult | null
    tracks: SearchedTrack[]
}

export const MainResults = ({ bestResult, tracks }: MainResultsProps) => {
    const { addTrackToQueue } = usePlayback()

    const handlePlay = (obj: SearchedTrack | SearchedAlbum | SearchedArtist) => {
        if (obj.type === "track") {
            addTrackToQueue(obj)
        }
    }

    return (
        <section className={styles.mainResults}>
            <div className={styles.bestResultBox}>
                <h3 className={styles.title}>Best Result</h3>
                {bestResult &&
                    <BestResultCard bestResult={bestResult} onPlay={handlePlay} />}
            </div>
            <div className={styles.tracksBox}>
                <h3 className={styles.title}>Tracks</h3>
                <div className={styles.tracks}>
                    {tracks.map((track, i) => {
                        if (i < 5) {
                            return <TrackRow
                                key={track.id}
                                album={track.albumName}
                                artists={track.artistNames}
                                explicit={track.explicit}
                                image={track.images[0].url}
                                index={i + 1}
                                time={msToMinutes(track.durationMs)}
                                title={track.name}
                                onPlay={() => handlePlay(track)}
                            />
                        }
                    })}
                </div>
            </div>
        </section>
    )
}