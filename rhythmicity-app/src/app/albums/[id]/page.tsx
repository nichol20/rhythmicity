"use client"
import Image from 'next/image'
import styles from '../../../styles/Album.module.scss'
import { TrackList, TrackRow } from '@/components/TrackList'
import { msToMinutes } from '@/utils/conversion'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { useEffect, useState } from 'react'
import { Album } from '@/types/album'
import { getAlbum, getTracksByAlbumId } from '@/utils/api'
import { Track } from '@/types/track'

interface AlbumPageProps {
    params: {
        id: string
    }
}

export default function AlbumPage({ params }: AlbumPageProps) {
    const { } = usePlayback()
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
            console.log(date.toDateString())
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
                        <TrackRow
                            key={t.id}
                            index={i + 1}
                            album={album}
                            artists={album.artists}
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