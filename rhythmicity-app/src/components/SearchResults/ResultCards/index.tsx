import { SearchedAlbum, SearchedArtist } from '@/types/search'
import { Card } from '@/components/Card'

import styles from './style.module.scss'
import { CardFallback } from '@/components/Card/CardFallback'
import { HighlightedMessage } from '@/components/HighlightedMessage'

export interface ResultCardsProps {
    results: SearchedArtist[] | SearchedAlbum[]
    title: string
    showFallback?: boolean
    hrefBasePath: string
    notFoundMessage: string
    isArtist?: boolean
}

export const ResultCards = ({ results, title, showFallback, hrefBasePath, isArtist, notFoundMessage }: ResultCardsProps) => {
    const CardList = () => {
        if (showFallback) {
            return Array(5).fill("").map((_, i) => {
                return <CardFallback key={i} kind="normal" />
            })
        }

        if (results.length === 0) {
            return <HighlightedMessage message={notFoundMessage} />
        }

        return results?.map((result, i) => {
            if (i < 5) {
                return (
                    <Card
                        key={result.id}
                        title={result.name}
                        image={result.images[0].url}
                        description={result.name}
                        href={`${hrefBasePath}/${result.id}`}
                        isArtist={isArtist}
                        isPlayable
                    />
                )
            }
        })
    }

    return (
        <section className={styles.resultsBox}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.results}>
                <CardList />
            </div>
        </section>
    )
} 