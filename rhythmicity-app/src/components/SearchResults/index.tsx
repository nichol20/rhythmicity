import { QueryKind, SearchResponse } from "@/utils/api"
import { MainResults } from "./MainResults"
import { ResultCards } from "./ResultCards"
import { HighlightedMessage } from "../HighlightedMessage"
import { TrackList, TrackRow } from "../TrackList"
import { Card } from "../Card"

import styles from './style.module.scss'

interface ResultsProps {
    showFallback: boolean
    kind: QueryKind
    searchResponse: SearchResponse
}

export const SearchResults = ({ kind, searchResponse, showFallback }: ResultsProps) => {
    if (kind === QueryKind.ALL) {
        return (
            <>
                <MainResults bestResult={searchResponse.bestResult} tracks={searchResponse.tracks} showFallback={showFallback} />
                <ResultCards
                    results={searchResponse.albums}
                    title='Albums'
                    hrefBasePath='/albums'
                    showFallback={showFallback}
                    notFoundMessage='No album found'
                />
                <ResultCards
                    results={searchResponse.artists}
                    title='Artists'
                    hrefBasePath='/artists'
                    showFallback={showFallback}
                    notFoundMessage='No artist found'
                    isArtist
                />
            </>
        )
    }
    else if (kind === QueryKind.TRACKS) {
        if (searchResponse.tracks.length === 0) {
            return <HighlightedMessage message='No track found' />
        }

        return (
            <TrackList>
                {searchResponse.tracks.map((t, i) => (
                    <TrackRow key={t.id} index={i + 1} track={t} />
                ))}
            </TrackList>
        )
    }
    else if (kind === QueryKind.ALBUMS) {
        if (searchResponse.albums.length === 0) {
            return <HighlightedMessage message='No album found' />
        }

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
        if (searchResponse.artists.length === 0) {
            return <HighlightedMessage message='No artist found' />
        }

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