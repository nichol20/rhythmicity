import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";
import { usePlayback } from "@/contexts/PlaybackContext";
import { ExplicitSign } from "../ExplicitSign";
import { deleteIcon, verticalEllipsisIcon } from "@/assets";
import { ClosableComponent } from "../ClosableElement";
import { RowOptions } from "../RowOptions";

import styles from './style.module.scss'

interface QueueTrackRowProps {
    track: Track | SearchedTrack
}

export const QueueTrackRow = ({ track }: QueueTrackRowProps) => {
    const [showOptionsBtn, setShowOptionsBtn] = useState(false)
    const { queueController } = usePlayback()

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

    const handleMouseOver = () => {
        setShowOptionsBtn(true)
    }

    const handleMoutseLeave = () => {
        setShowOptionsBtn(false)
    }

    const deleteTrack = () => {
        queueController.delete(track.id)
    }

    return (
        <div
            className={styles.trackItem}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMoutseLeave}
        >
            <div className={styles.info}>
                <div className={styles.imgBox}>
                    <Image
                        src={getImage(track)}
                        alt={getName(track)}
                        width={48}
                        height={48}
                        onClick={() => queueController.skipTo(track.id)}
                    />
                </div>
                <div className={styles.description}>
                    <Link href={`/tracks/${track.id}`} className={styles.name}>{getName(track)}</Link>
                    <span className={styles.genres}>
                        {track.explicit && <ExplicitSign />}
                        {track.genres.join(', ')}
                    </span>
                </div>
            </div>
            <RowOptions
                showBtn={showOptionsBtn}
                options={[
                    {
                        action: deleteTrack,
                        description: "Delete from queue",
                        icon: deleteIcon,
                        name: "delete"
                    }
                ]}
            />
        </div>
    )
}