'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { getPopularAlbums, getPopularArtists, getPopularTracks } from '@/utils/api'
import { Album } from '@/types/album'
import { Artist } from '@/types/artist'
import { Track } from '@/types/track'
import { collectionBackground } from '@/assets'
import { Card } from '@/components/Card'
import { Carousel } from '@/components/Carousel'
import { Header } from '@/components/Header'
import { usePlayback } from '@/contexts/Playback'
import { CardFallback } from '@/components/Card/CardFallback'

import styles from '@/styles/Collection.module.scss'

export default function CollectionPage() {
    const [popularAlbums, setPopularAlbums] = useState<Album[]>([])
    const [popularArtists, setPopularArtists] = useState<Artist[]>([])
    const [popularTracks, setPopularTracks] = useState<Track[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { queueController } = usePlayback(true)

    useEffect(() => {
        const fetchData = async () => {
            const albums = await getPopularAlbums()
            setPopularAlbums(albums)
            const artists = await getPopularArtists()
            setPopularArtists(artists)
            const tracks = await getPopularTracks()
            setPopularTracks(tracks)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const fallbackList = () => {
        return Array(10).fill("").map((_, i) => {
            return <CardFallback key={i} kind="normal" />
        })
    }

    const albumList = () => {
        if (isLoading) return fallbackList()
        return popularAlbums.map(album => {
            return (
                <Card
                    key={album.id}
                    image={album.spotify.images[0].url}
                    isPlayable
                    title={album.name}
                    href={`/albums/${album.id}`}
                    description={album.genres.join(", ")}
                    onPlay={() => queueController.playAlbum(album)}
                />
            )
        })
    }

    const artistList = () => {
        if (isLoading) return fallbackList()
        return popularArtists.map(artist => (
            <Card
                key={artist.id}
                image={artist.spotify.images[0].url}
                isPlayable
                title={artist.name}
                href={`/artists/${artist.id}`}
                description={artist.genres.join(", ")}
                onPlay={() => queueController.playArtist(artist)}
            />
        ))
    }

    const trackList = () => {
        if (isLoading) return fallbackList()
        return popularTracks.map(track => (
            <Card
                key={track.id}
                image={track.spotify.albumImages[0].url}
                isPlayable
                title={track.spotify.title}
                href={`/tracks/${track.id}`}
                description={track.genres.join(", ")}
                onPlay={() => queueController.playNow(track)}
            />
        ))
    }

    return (
        <div className={styles.collectionPage}>
            <Header />
            <div className={styles.bannerContainer}>
                <Image src={collectionBackground} alt="background" />

                <div className={styles.rightSide}>
                    <div className={styles.textBox}>
                        <h1 className={styles.title}>Rhythmicity</h1>
                        <span className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quo reiciendis doloremque incidunt, repudiandae perspiciatis facere ratione excepturi fuga distinctio quia sapiente atque cum porro velit asperiores? Neque, vitae nihil.</span>
                        <button className={styles.btn}>
                            Something
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.collections}>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Albums</h3>
                    <Carousel max={10}>
                        {albumList()}
                    </Carousel>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Artists</h3>
                    <Carousel max={10}>
                        {artistList()}
                    </Carousel>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Tracks</h3>
                    <Carousel max={10}>
                        {trackList()}
                    </Carousel>
                </section>

            </div>
        </div>
    )
}