'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'

import { QueryKind, SearchResponse, search } from '@/utils/api'
import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { usePlayback } from '@/contexts/Playback'
import { useInfiniteScrolling } from '@/hooks/useInfiniteScroll'
import { SearchResults } from '@/components/SearchResults'

import styles from '@/styles/Search.module.scss'

const KINDS = ['all', 'tracks', 'artists', 'albums']
const SEARCH_LIMIT = 20

export default function SearchPage() {
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

            if (
                searchRes.tracks.length === 0
                && searchRes.albums.length === 0
                && searchRes.artists.length === 0
            ) return // end

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
        router.replace(`${pathname}?${params.toString()}`)
        const searchRes = await searchData(searchQuery, 0, getKind(kind))
        setSearchResponse(searchRes)
    }

    const getKindClass = (kind: string) => {
        return kindParam === kind ? styles.active : ""
    }

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        const fetchInitialData = async () => {
            try {
                const searchRes = await searchData(searchQuery, 0, getKind(kindParam), cancelToken)
                setPage(1)
                setSearchResponse(searchRes)
                setIsLoading(false)
            } catch (error: any) {
                if (axios.isCancel(error)) {
                    return console.log("request cancelled")
                }

                console.log(error)
            }
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
                    <SearchResults
                        kind={getKind(kindParam)}
                        searchResponse={searchResponse}
                        showFallback={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}