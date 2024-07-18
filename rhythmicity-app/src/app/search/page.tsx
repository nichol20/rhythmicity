'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { QueryKind, SearchResponse, search } from '@/utils/api'
import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { ResultCards } from '@/components/SearchResults/ResultCards'
import { MainResults } from '@/components/SearchResults/MainResults'
import { usePlayback } from '@/contexts/PlaybackContext'
import withAuth from '@/hoc/withAuth'

import styles from '@/styles/Search.module.scss'
import { TrackList, TrackRow } from '@/components/TrackList'
import { msToMinutes } from '@/utils/conversion'
import { Card } from '@/components/Card'

const kinds = ['all', 'tracks', 'artists', 'albums']

function SearchPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('q') || ""
    const kindParam = searchParams.get("kind") || "all"
    const [searchResponse, setSearchResponse] = useState<SearchResponse>({ albums: [], artists: [], tracks: [], bestResult: null })
    const [isLoading, setIsLoading] = useState(true)
    const { } = usePlayback(true)

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
        setIsLoading(false)
    }, [getKind, pathname, router, searchParams])

    const handleKindSelection = (kind: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('kind', kind)
        router.replace(`${pathname}?${params.toString()}`)
    }

    const getKindClass = (kind: string) => {
        return kindParam === kind ? styles.active : ""
    }

    const Results = () => {
        const kind = getKind()
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
                        <TrackRow
                            key={t.id}
                            album={t.album}
                            artists={t.artists}
                            explicit={t.explicit}
                            image={t.images[0].url}
                            index={i + 1}
                            time={msToMinutes(t.durationMs)}
                            track={t}
                        />
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
                            image={a.images[0].url}
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
                    {searchResponse.artists.map(a => (
                        <Card
                            key={a.id}
                            title={a.name}
                            image={a.images[0].url}
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
                    <Results />
                </div>
            </div>
        </div>
    )
}

export default withAuth(SearchPage)