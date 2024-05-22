import { SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";

import styles from './style.module.scss'
import Image from "next/image";
import { ExplicitSign } from "../ExplicitSign";
import { deleteIcon, verticalEllipsisIcon } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { usePlayback } from "@/contexts/PlaybackContext";
import Link from "next/link";

interface QueueTrackRowProps {
    track: Track | SearchedTrack
}

export const QueueTrackRow = ({ track }: QueueTrackRowProps) => {
    const [showOptionsBtn, setShowOptionsBtn] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const { queueController } = usePlayback()
    const optionsRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        //@ts-ignore
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

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
        setShowOptions(false)
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
            <div className={styles.actions}>
                {showOptionsBtn && (
                    <button className={styles.optionsBtn} onClick={() => setShowOptions(prev => !prev)}>
                        <Image src={verticalEllipsisIcon} alt="options" />
                    </button>
                )}
                {showOptions && (
                    <div className={styles.options} ref={optionsRef}>
                        <button className={styles.optionItem} onClick={deleteTrack}>
                            <div className={styles.optoinsImgBox}>
                                <Image src={deleteIcon} alt="delete" />
                            </div>
                            <span className={styles.actionDescription}>Delete from queue</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}