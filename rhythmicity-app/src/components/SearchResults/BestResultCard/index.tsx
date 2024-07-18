import { BestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search"
import { Card } from "@/components/Card"

interface BestResultProps {
    bestResult: BestResult
    onPlay: (bestResult: SearchedAlbum | SearchedArtist | SearchedTrack) => void
}

export const BestResultCard = ({ bestResult, onPlay }: BestResultProps) => {
    const getImage = (): string => {
        return bestResult[bestResult.type]?.images[0].url ?? ""
    }

    const getTitle = (): string => {
        return bestResult[bestResult.type]?.name ?? ""
    }

    const getType = (): string => {
        const type = bestResult[bestResult.type]?.type ?? ""
        return type[0].toLocaleUpperCase() + type.slice(1)
    }

    const getGenres = (): string[] => {
        return bestResult[bestResult.type]?.genres ?? []
    }

    const getHref = (): string => {
        if (bestResult.type === "album") return `/albums/${bestResult.album.id}`
        else if (bestResult.type === "artist") return `/artists/${bestResult.artist.id}`
        else if (bestResult.type === "track") return `/albums/${bestResult.track.id}`
        else return "#"
    }

    const handlePlay = () => {
        if (bestResult) {
            const br = bestResult[bestResult.type]
            if (br) {
                onPlay(br)
            }
        }
    }

    return (
        <Card
            description={`${getType()} • ${getGenres().join(", ")}`}
            image={getImage()}
            title={getTitle()}
            onPlay={handlePlay}
            isArtist={false}
            href={getHref()}
            isPlayable
            kind='big'
        />
    )
}