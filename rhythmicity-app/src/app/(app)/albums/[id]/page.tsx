"use client"
import { useEffect, useState } from 'react'

import { getAlbum, getTracksByAlbumId } from '@/utils/api'
import { msToMinutes } from '@/utils/conversion'
import { Album } from '@/types/album'
import { Track } from '@/types/track'
import { usePlayback } from '@/contexts/Playback'
import { TrackList, TrackRow } from '@/components/TrackList'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'

import styles from '@/styles/Album.module.scss'

interface AlbumPageProps {
    params: {
        id: string
    }
}

export default function AlbumPage({ params }: AlbumPageProps) {
    const { } = usePlayback(true)
    const [album, setAlbum] = useState<Album>()
    const [tracks, setTracks] = useState<Track[]>()

    useEffect(() => {
        const setData = async () => {
            const a = await getAlbum(params.id)
            setAlbum(a)
            const ts = await getTracksByAlbumId(params.id)
            setTracks(ts)
        }
        setData()
    }, [params.id])

    const calculateTotalTime = () => {
        if (tracks) {
            const timeArray = tracks.map(t => t.youtube.durationMs)
            const totalMs = timeArray.reduce((acc, value) => acc + value, 0)
            const [minutes, seconds] = msToMinutes(totalMs).split(":")
            return `${minutes}min ${seconds}sec`
        }

        return ""
    }

    const formatDate = () => {
        if (album?.spotify.releaseDate) {
            const date = new Date(album.spotify.releaseDate)
            return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
        }

        return ""
    }

    if (!album) return <>Loading...</>

    return (
        <div className={styles.albumPage}>
            <Header />
            <Banner
                description={album.genres.join(", ")}
                picture={album.spotify.images[0].url}
                title={album.name}
                type={"Album"}
                metadata={[
                    formatDate(),
                    `${album.totalTracks} songs, ${calculateTotalTime()}`
                ]}
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