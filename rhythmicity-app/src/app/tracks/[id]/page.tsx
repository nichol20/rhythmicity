"use client"
import styles from '../../../styles/Track.module.scss'
import { TrackList, TrackRow } from '@/components/TrackList'
import { msToMinutes } from '@/utils/conversion'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { useEffect, useState } from 'react'
import { Track } from '@/types/track'
import { getTrack, getTracksByAlbumId } from '@/utils/api'

interface TrackPageProps {
    params: {
        id: string
    }
}

export default function TrackPage({ params }: TrackPageProps) {
    const { } = usePlayback(true)
    const [track, setTrack] = useState<Track>()
    const [tracks, setTracks] = useState<Track[]>()

    useEffect(() => {
        const setData = async () => {
            const t = await getTrack(params.id)
            setTrack(t)
            const ts = await getTracksByAlbumId(t.album.id)
            setTracks(ts)
        }

        setData()
    }, [params.id])

    if (!track) return <>Loading...</>

    return (
        <div className={styles.trackPage}>
            <Header />
            <Banner
                description={track.genres.join(", ")}
                picture={track.spotify.albumImages[0].url}
                title={track.spotify.title}
                type={"Track"}
                metadata={[
                    track.artists.map(a => a.name).join(", "),
                    msToMinutes(track.youtube.durationMs)
                ]}
            />
            <div className={styles.tracks}>
                <TrackList>
                    {tracks?.map((t, i) =>
                        <TrackRow
                            key={t.id}
                            index={i + 1}
                            album={t.album}
                            artists={t.artists}
                            track={t}
                            explicit={t.explicit}
                            image={t.spotify.albumImages[0].url}
                            time={msToMinutes(t.youtube.durationMs)}
                        />)}
                </TrackList>
            </div>
        </div>
    )
}