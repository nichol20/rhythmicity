import { SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";

import styles from './style.module.scss'
import Image from "next/image";
import { ExplicitSign } from "../ExplicitSign";

interface QueueTrackRowProps {
    track: Track | SearchedTrack
}

export const QueueTrackRow = ({ track }: QueueTrackRowProps) => {

    const getImage = (track: SearchedTrack | Track) => {
        if ("spotify" in track) {
            return track.spotify.albumImages[0].url
        }

        return track.images[0].url
    }

    const getName = (track: SearchedTrack | Track) => {
        if ("spotify" in track) {
            return track.spotify.title
        }

        return track.name
    }

    return (
        <div key={track.id} className={styles.trackItem}>
            <div className={styles.info}>
                <div className={styles.imgBox}>
                    <Image src={getImage(track)} alt={getName(track)} width={48} height={48} />
                </div>
                <div className={styles.description}>
                    <span className={styles.name}>{getName(track)}</span>
                    <span className={styles.genres}>
                        {track.explicit && <ExplicitSign />}
                        {track.genres.join(', ')}
                    </span>
                </div>
            </div>
            <div className={styles.actions}>

            </div>
        </div>
    )
}