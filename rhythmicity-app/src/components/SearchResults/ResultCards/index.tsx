import { SearchedAlbum, SearchedArtist } from '@/types/search'
import styles from './style.module.scss'
import { Card } from '@/components/Card'

export interface ResultCardsProps {
    results: SearchedArtist[] | SearchedAlbum[]
    title: string
}

export const ResultCards = ({ results, title }: ResultCardsProps) => {
    return (
        <section className={styles.resultsBox}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.results}>
                {results?.map((result, i) => {
                    if (i < 5) {
                        return (
                            <Card
                                key={result.id}
                                title={result.name}
                                image={result.images[0].url}
                                description={result.name}
                                isPlayable
                            />
                        )
                    }
                })}
            </div>
        </section>
    )
} 