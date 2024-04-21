'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { TrackList, TrackRow } from '@/components/TrackList'
import { usePlayback } from '@/contexts/PlaybackContext'

import styles from '@/styles/Search.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { QueryKind, SearchResponse, search } from '@/utils/api'
import { BestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from '@/types/search'
import { msToMinutes, secondsToMinutes } from '@/utils/conversion'
import { BestResultCard } from '@/components/BestResultCard'
import { Card } from '@/components/Card'
const kinds = ['all', 'tracks', 'artists', 'albums']

export default function SearchPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { setShowPlaybackBar, addTrackToQueue } = usePlayback()
    const searchQuery = searchParams.get('q') || ""
    const kindParam = searchParams.get("kind") || "all"
    const [searchResponse, setSearchResponse] = useState<SearchResponse>({ albums: [], artists: [], tracks: [], bestResult: null })

    const getKind = useCallback((): QueryKind => {
        switch (kindParam) {
            case "albums":
                return QueryKind.ALBUMS
            case "artists":
                return QueryKind.ARTISTS
            case "tracks":
                return QueryKind.TRACKS
            default:
                return QueryKind.ALL
        }
    }, [kindParam])

    const handleSearch = useCallback(async (query: string) => {
        const params = new URLSearchParams(searchParams.toString())

        const searchRes = await search({
            query: query,
            kind: getKind()
        })
        setSearchResponse(searchRes)
        params.set("q", query)
        if (!query) {
            params.delete("q")
        }
        router.replace(`${pathname}?${params.toString()}`)
    }, [getKind, pathname, router, searchParams])

    const handleKindSelection = (kind: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('kind', kind)
        router.replace(`${pathname}?${params.toString()}`)
    }

    const getKindClass = (kind: string) => {
        return kindParam === kind ? styles.active : ""
    }

    const handlePlay = (obj: SearchedTrack | SearchedAlbum | SearchedArtist) => {
        if (obj.type === "track") {
            addTrackToQueue(obj)
        }
    }

    useEffect(() => {
        setShowPlaybackBar(true)
    }, [setShowPlaybackBar])

    return (
        <div className={styles.searchPage}>
            <Header />
            <div className={styles.content}>
                <SearchInput onChange={handleSearch} defaultValue={searchQuery} delay={500} />
                <div className={styles.kinds}>
                    {kinds.map((k, i) => (
                        <button
                            key={i}
                            onClick={() => handleKindSelection(k)}
                            className={getKindClass(k)}
                        >{k}</button>
                    ))}
                </div>

                <div className={styles.results}>
                    <section className={styles.mainResults}>
                        <div className={styles.bestResultBox}>
                            <h3 className={styles.title}>Best Result</h3>
                            {searchResponse.bestResult &&
                                <BestResultCard bestResult={searchResponse.bestResult} onPlay={handlePlay} />}
                        </div>
                        <div className={styles.tracksBox}>
                            <h3 className={styles.title}>Tracks</h3>
                            <div className={styles.tracks}>
                                {searchResponse.tracks.map((track, i) => {
                                    if (i < 5) {
                                        return <TrackRow
                                            key={track.id}
                                            album={track.albumName}
                                            artists={track.artistNames}
                                            explicit={track.explicit}
                                            image={track.images[0].url}
                                            index={i + 1}
                                            time={msToMinutes(track.durationMs)}
                                            title={track.name}
                                            onPlay={() => handlePlay(track)}
                                        />
                                    }
                                })}
                            </div>
                        </div>
                    </section>
                    <section className={styles.albumResults}>
                        <h3 className={styles.title}>Albums</h3>
                        <div className={styles.albums}>
                            {searchResponse.albums.map((album, i) => (
                                <Card
                                    key={album.id}
                                    title={album.name}
                                    image={album.images[0].url}
                                    description={album.name}
                                    isPlayable
                                />
                            ))}
                        </div>
                    </section>
                    <section className={styles.artistResults}>
                        <h3 className={styles.title}>Artists</h3>
                        <div className={styles.artists}>
                            {searchResponse.artists.map((artist, i) => (
                                <Card
                                    key={artist.id}
                                    title={artist.name}
                                    image={artist.images[0].url}
                                    description={artist.name}
                                    isPlayable
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}