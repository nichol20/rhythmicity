'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { collectionBackground, logo } from '@/assets'
import { Card } from '@/components/Card'
import { Carousel } from '@/components/Carousel'
import { Header } from '@/components/Header'
import { usePlayback } from '@/contexts/PlaybackContext'

import styles from '@/styles/Collection.module.scss'
import { https } from '@/utils/http'
import { Album } from '@/types/album'
import { Artist } from '@/types/artist'
import { Track } from '@/types/track'

export default function CollectionPage() {
    const [popularAlbums, setPopularAlbums] = useState<Album[]>([])
    const [popularArtists, setPopularArtists] = useState<Artist[]>([])
    const [popularTracks, setPopularTracks] = useState<Track[]>([])
    const { setShowPlaybackBar } = usePlayback()

    useEffect(() => {
        setShowPlaybackBar(true)
    }, [setShowPlaybackBar])

    useEffect(() => {
        const getPopularAlbums = async () => {
            const res = await https.get<Album[]>("/popular/albums")
            setPopularAlbums(res.data)
        }

        const getPopularArtists = async () => {
            const res = await https.get<Artist[]>("/popular/artists")
            setPopularArtists(res.data)
        }

        const getPopularTracks = async () => {
            const res = await https.get<Track[]>("/popular/tracks")
            setPopularTracks(res.data)
        }

        getPopularAlbums()
        getPopularArtists()
        getPopularTracks()
    }, [])

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
                        {popularAlbums.map(album => (
                            <Card
                                key={album.id}
                                image={album.spotify.images[0].url}
                                isPlayable
                                title={album.name}
                                description={album.genres.join(", ")}
                            />
                        ))}
                    </Carousel>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Artists</h3>
                    <Carousel max={10}>
                        {popularArtists.map(artist => (
                            <Card
                                key={artist.id}
                                image={artist.spotify.images[0].url}
                                isPlayable
                                title={artist.name}
                                description={artist.genres.join(", ")}
                            />
                        ))}
                    </Carousel>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Tracks</h3>
                    <Carousel max={10}>
                        {popularTracks.map(track => (
                            <Card
                                key={track.id}
                                image={track.spotify.albumImages[0].url}
                                isPlayable
                                title={track.spotify.title}
                                description={track.genres.join(", ")}
                            />
                        ))}
                    </Carousel>
                </section>

            </div>
        </div>
    )
}