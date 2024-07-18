import { SearchedAlbum, SearchedArtist } from '@/types/search'
import { Card } from '@/components/Card'

import styles from './style.module.scss'
import { CardFallback } from '@/components/Card/CardFallback'

export interface ResultCardsProps {
    results: SearchedArtist[] | SearchedAlbum[]
    title: string
    showFallback?: boolean
    hrefBasePath: string
}

export const ResultCards = ({ results, title, showFallback, hrefBasePath }: ResultCardsProps) => {
    const CardList = () => {
        if (showFallback) {
            return Array(5).fill("").map((_, i) => {
                return <CardFallback key={i} kind="normal" />
            })
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