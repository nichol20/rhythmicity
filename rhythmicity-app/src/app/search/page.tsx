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
import { useEffect } from 'react'

const kinds = ['all', 'tracks', 'artists', 'albums']

export default function SearchPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { setShowPlaybackBar } = usePlayback()
    const searchQuery = searchParams.get('q') || ""
    const kindParam = searchParams.get("kind") || "all"

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (query) {
            params.set("q", query)
        } else {
            params.delete("q")
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    const handleKindSelection = (kind: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('kind', kind)
        router.replace(`${pathname}?${params.toString()}`)
    }

    const getKindClass = (kind: string) => {
        return kindParam === kind ? styles.active : ""
    }

    useEffect(() => {
        setShowPlaybackBar(true)
    }, [setShowPlaybackBar])

    return (
        <div className={styles.searchPage}>
            <Header />
            <div className={styles.content}>
                <SearchInput onSearch={handleSearch} defaultValue={searchQuery} delay={1000} />
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
                    <Card description='description' image={logo} title='title' isArtist={false} isPlayable kind='big' />
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