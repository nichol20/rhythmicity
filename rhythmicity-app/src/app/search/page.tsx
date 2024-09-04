'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'

import withAuth from '@/hoc/withAuth'
import { QueryKind, SearchResponse, search } from '@/utils/api'
import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { ResultCards } from '@/components/SearchResults/ResultCards'
import { MainResults } from '@/components/SearchResults/MainResults'
import { usePlayback } from '@/contexts/PlaybackContext'
import { TrackList, TrackRow } from '@/components/TrackList'
import { Card } from '@/components/Card'
import { useInfiniteScrolling } from '@/hooks/useInfiniteScroll'

import styles from '@/styles/Search.module.scss'

const KINDS = ['all', 'tracks', 'artists', 'albums']
const SEARCH_LIMIT = 20

function SearchPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('q') || ""
    const kindParam = searchParams.get("kind") || "all"
    const [searchResponse, setSearchResponse] = useState<SearchResponse>({
        albums: [],
        artists: [],
        tracks: [],
        bestResult: null
    })
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)

    usePlayback(true)

    const getKind = (kind: string): QueryKind => {
        switch (kind) {
            case "albums":
                return QueryKind.ALBUMS
            case "artists":
                return QueryKind.ARTISTS
            case "tracks":
                return QueryKind.TRACKS
            default:
                return QueryKind.ALL
        }
    }

    const searchData = async (query: string, page: number, kind: QueryKind, cancelToken?: CancelTokenSource) => {
        setIsLoading(true)
        const searchRes = await search({
            query: query,
            limit: SEARCH_LIMIT,
            offset: page * SEARCH_LIMIT,
            kind: kind
        }, { cancelToken: cancelToken?.token })
        setIsLoading(false)
        return searchRes
    }

    const fetchData = useCallback(
        async (cancelToken?: CancelTokenSource) => {
            const searchRes = await searchData(searchQuery, page, getKind(kindParam), cancelToken)
            setPage(prev => prev + 1)
            setSearchResponse(prev => {
                return {
                    albums: [...prev.albums, ...searchRes.albums],
                    artists: [...prev.artists, ...searchRes.artists],
                    tracks: [...prev.tracks, ...searchRes.tracks],
                    bestResult: searchRes.bestResult
                }
            })
        }, [searchQuery, kindParam, page])

    const handleEndOfPage = useCallback(() => {
        if (!isLoading && getKind(kindParam) !== QueryKind.ALL) {
            fetchData()
        }
    }, [isLoading, fetchData, kindParam])

    const handleSearch = useCallback(
        async (query: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set("q", query)
            if (!query) {
                params.delete("q")
            }
            router.replace(`${pathname}?${params.toString()}`)
            setPage(1)
            const searchRes = await searchData(query, 0, getKind(kindParam))
            setSearchResponse(searchRes)
        }, [pathname, router, searchParams, kindParam]
    )

    const handleKindSelection = async (kind: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('kind', kind)
        console.log(kind)
        router.replace(`${pathname}?${params.toString()}`)
        const searchRes = await searchData(searchQuery, 0, getKind(kind))
        setSearchResponse(searchRes)
    }

    const getKindClass = (kind: string) => {
        return kindParam === kind ? styles.active : ""
    }

    const Results = () => {
        const kind = getKind(kindParam)
        if (kind === QueryKind.ALL) {
            return (
                <>
                    <MainResults bestResult={searchResponse.bestResult} tracks={searchResponse.tracks} showFallback={isLoading} />
                    <ResultCards
                        results={searchResponse.albums}
                        title='Albums'
                        hrefBasePath='/albums'
                        showFallback={isLoading}
                    />
                    <ResultCards
                        results={searchResponse.artists}
                        title='Artists'
                        hrefBasePath='/artists'
                        showFallback={isLoading}
                        isArtist
                    />
                </>
            )
        }
        else if (kind === QueryKind.TRACKS) {
            return (
                <TrackList>
                    {searchResponse.tracks.map((t, i) => (
                        <TrackRow key={t.id} index={i + 1} track={t} />
                    ))}
                </TrackList>
            )
        }
        else if (kind === QueryKind.ALBUMS) {
            return (
                <div className={styles.albumResults}>
                    {searchResponse.albums.map(a => (
                        <Card
                            key={a.id}
                            title={a.name}
                            image={a.images[0]?.url}
                            description={a.name}
                            href={`/albums/${a.id}`}
                            isPlayable
                        />
                    ))}
                </div>
            )
        }
        else if (kind === QueryKind.ARTISTS) {
            return (
                <div className={styles.artistResults}>
                    {searchResponse.artists.map((a, i) => (
                        <Card
                            key={i}
                            title={a.name}
                            image={a.images[0]?.url}
                            description={a.name}
                            href={`/artists/${a.id}`}
                            isArtist
                            isPlayable
                        />
                    ))}
                </div>
            )
        }
    }

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        const fetchInitialData = async () => {
            const searchRes = await searchData(searchQuery, 0, getKind(kindParam), cancelToken)
            setPage(1)
            setSearchResponse(searchRes)
            setIsLoading(false)
        }

        if (searchResponse.bestResult === null) {
            fetchInitialData()
        }

        return () => {
            cancelToken.cancel()
        }
    }, [searchResponse, searchQuery, kindParam])

    useInfiniteScrolling(() => {
        handleEndOfPage()
    }, 400)

    return (
        <div className={styles.searchPage}>
            <Header />
            <div className={styles.content}>
                <SearchInput onChange={handleSearch} defaultValue={searchQuery} delay={500} />
                <div className={styles.kinds}>
                    {KINDS.map((k, i) => (
                        <button
                            key={i}
                            onClick={() => handleKindSelection(k)}
                            className={getKindClass(k)}
                        >{k}</button>
                    ))}
                </div>

                <div className={styles.results}>
                    <Results />
                </div>
            </div>
        </div>
    )
}

export default withAuth(SearchPage)