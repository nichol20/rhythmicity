import { BestResult as IBestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search"
import { Card } from "../Card"

interface BestResultProps {
    bestResult: IBestResult
    onPlay: (bestResult: SearchedAlbum | SearchedArtist | SearchedTrack) => void
}

export const BestResultCard = ({ bestResult, onPlay }: BestResultProps) => {
    const getBestResultImage = (result: IBestResult): string => {
        return result[result.type]?.images[0].url ?? ""
    }

    const getBestResultTitle = (result: IBestResult): string => {
        return result[result.type]?.name ?? ""
    }

    const getBestResultType = (result: IBestResult): string => {
        return result[result.type]?.type ?? ""
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
            description={getBestResultType(bestResult)}
            image={getBestResultImage(bestResult)}
            title={getBestResultTitle(bestResult)}
            onPlay={handlePlay}
            isArtist={false}
            isPlayable
            kind='big'
        />
    )
}