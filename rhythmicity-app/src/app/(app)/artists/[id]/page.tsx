"use client"
import { useEffect, useState } from 'react'

import { getArtist, getTracksByArtistId } from '@/utils/api'
import { Artist } from '@/types/artist'
import { Track } from '@/types/track'
import { usePlayback } from '@/contexts/Playback'
import { TrackList, TrackRow } from '@/components/TrackList'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'

import styles from '@/styles/Artist.module.scss'
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
                metadata={[]}
            />
            <div className={styles.tracks}>
                <TrackList>
                    {tracks?.map((t, i) =>
                        <TrackRow key={t.id} index={i + 1} track={t} />)}
                </TrackList>
            </div>
        </div>
    )
}
