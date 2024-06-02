'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { QueryKind, SearchResponse, search } from '@/utils/api'
import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { ResultCards } from '@/components/SearchResults/ResultCards'
import { MainResults } from '@/components/SearchResults/MainResults'

import styles from '@/styles/Search.module.scss'

const kinds = ['all', 'tracks', 'artists', 'albums']

export default function SearchPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
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
                    <MainResults bestResult={searchResponse.bestResult} tracks={searchResponse.tracks} />
                    <ResultCards results={searchResponse.albums} title='Albums' />
                    <ResultCards results={searchResponse.artists} title='Artists' />
                </div>
            </div>
        </div>
    )
}