'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { logo } from '@/assets'
import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { SearchInput } from '@/components/SearchInput'
import { TrackList, TrackRow } from '@/components/TrackList'
import { usePlayback } from '@/contexts/PlaybackContext'

import styles from '@/styles/Search.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { QueryKind, SearchResponse, search } from '@/utils/api'
import { BestResult } from '@/types/search'
const kinds = ['all', 'tracks', 'artists', 'albums']

export default function SearchPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { setShowPlaybackBar } = usePlayback()
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

    const getBestResultImage = (result: BestResult): string => {
        if (result.bestResult === "track") {
            return result.track.images[0].url
        } else if (result.bestResult === "artist") {
            return result.artist.images[0].url
        } else if (result.bestResult === "album") {
            return result.album.images[0].url
        }
        return ""
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
                    {searchResponse.bestResult &&
                        <Card
                            description={"searchResponse.bestResult.type"}
                            image={getBestResultImage(searchResponse.bestResult)}
                            title={"searchResponse.bestResult"}
                            isArtist={false}
                            isPlayable kind='big'
                        />}
                    <TrackList>
                        <TrackRow
                            album='nome do album'
                            artists={['joão', 'fernanda', 'henrique']}
                            explicit={true}
                            image={logo}
                            index={1}
                            time='7:30'
                            title='titulo'
                        />
                        <TrackRow
                            album='nome do album'
                            artists={['joão', 'fernanda', 'henrique']}
                            explicit={true}
                            image={logo}
                            index={2}
                            time='7:30'
                            title='titulo'
                        />
                        <TrackRow
                            album='nome do album'
                            artists={['joão', 'fernanda', 'henrique']}
                            explicit={true}
                            image={logo}
                            index={3}
                            time='7:30'
                            title='titulo'
                        />
                        <TrackRow
                            album='nome do album'
                            artists={['joão', 'fernanda', 'henrique']}
                            explicit={true}
                            image={logo}
                            index={4}
                            time='7:30'
                            title='titulo'
                        />
                        <TrackRow
                            album='nome do album'
                            artists={['joão', 'fernanda', 'henrique']}
                            explicit={true}
                            image={logo}
                            index={5}
                            time='7:30'
                            title='titulo'
                        />
                    </TrackList>
                </div>
            </div>
        </div>
    )
}