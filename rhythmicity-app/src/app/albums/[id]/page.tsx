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
            return msToMinutes(totalMs)
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
                metadata={(
                    <>
                        <span>{album.spotify.releaseDate}</span>
                        <span>•</span>
                        <span>{album.totalTracks} songs, {calculateTotalTime()}</span>
                    </>
                )}
            />
            <div className={styles.tracks}>
                <TrackList>
                    {tracks?.map((t, i) =>
                        <TrackRow
                            key={t.id}
                            album={album.name}
                            artists={[]}
                            explicit={t.explicit}
                            image={t.spotify.albumImages[0].url}
                            index={i}
                            time={msToMinutes(t.youtube.durationMs)}
                            title={t.spotify.title}
                        />)}
                </TrackList>
            </div>
        </div>
    )
}