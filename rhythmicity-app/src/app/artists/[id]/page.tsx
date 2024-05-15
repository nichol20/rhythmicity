"use client"
import Image from 'next/image'
import styles from '../../../styles/Artist.module.scss'
import { TrackList, TrackRow } from '@/components/TrackList'
import { msToMinutes } from '@/utils/conversion'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { useEffect, useState } from 'react'
import { getArtist, getTracksByArtistId } from '@/utils/api'
import { Artist } from '@/types/artist'
import { Track } from '@/types/track'

interface ArtistPageProps {
    params: {
        id: string
    }
}

export default function ArtistPage({ params }: ArtistPageProps) {
    const { } = usePlayback(true)
    const [artist, setArtist] = useState<Artist>()
    const [tracks, setTracks] = useState<Track[]>()

    useEffect(() => {
        const setData = async () => {
            const a = await getArtist(params.id)
            setArtist(a)
            const ts = await getTracksByArtistId(params.id)
            setTracks(ts)

        }
        setData()
    }, [params.id])

    if (!artist) return <>Loading...</>

    return (
        <div className={styles.artistPage}>
            <Header />
            <Banner
                description={artist.genres.join(", ")}
                picture={artist.spotify.images[0].url}
                title={artist.name}
                type={"Artist"}
                metadata={(
                    <>
                    </>
                )}
            />
            <div className={styles.tracks}>
                <TrackList>
                    {tracks?.map((t, i) =>
                        <TrackRow
                            key={t.id}
                            album={t.album}
                            artists={t.artists}
                            explicit={t.explicit}
                            track={t}
                            image={t.spotify.albumImages[0].url}
                            index={i}
                            time={msToMinutes(t.youtube.durationMs)}
                        />)}
                </TrackList>
            </div>
        </div>
    )
}