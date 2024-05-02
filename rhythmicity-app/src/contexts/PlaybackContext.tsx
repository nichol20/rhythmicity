'use client'
import { PlaybackBar } from "@/components/PlaybackBar";
import { Queue } from "@/components/Queue";
import { PlayerState } from "@/components/YoutubePlayer";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";
import { getTracksByAlbumId, getTracksByArtistId } from "@/utils/api";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface PlaybackContext {
    showPlaybackBar: boolean
    setShowPlaybackBar: Dispatch<SetStateAction<boolean>>
    setShowQueue: Dispatch<SetStateAction<boolean>>
    currentPlayerState: PlayerState
    setCurrentPlayerState: Dispatch<SetStateAction<PlayerState>>
    queue: (Track | SearchedTrack)[]
    playNext: () => void
    cleanQueue: () => void
    addTrackToQueue: (track: Track | SearchedTrack) => void
    addAlbumToQueue: (album: Album | SearchedAlbum) => Promise<void>
    addArtistToQueue: (artist: Artist | SearchedArtist) => Promise<void>
}

interface PlaybackProviderProps {
    children: ReactNode
}

export const PlaybackContext = createContext({} as PlaybackContext)

export const usePlayback = (showPlaybackBar: boolean = false) => {
    const context = useContext(PlaybackContext)

    useEffect(() => {
        if (showPlaybackBar) {
            context.setShowPlaybackBar(true)
        }
    }, [showPlaybackBar, context])

    return context
}

export const PlaybackProvider = ({ children }: PlaybackProviderProps) => {
    const [showPlaybackBar, setShowPlaybackBar] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<Track | SearchedTrack | null>(null)
    const [currentPlayerState, setCurrentPlayerState] = useState<PlayerState>(PlayerState.UNSTARTED)
    const [queue, setQueue] = useState<(Track | SearchedTrack)[]>([])
    const [showQueue, setShowQueue] = useState(true)

    const addTrackToQueue = (track: Track | SearchedTrack) => {
        setQueue(prev => {
            if (prev.length === 0) {
                setCurrentTrack(track)
            }
            return [...prev, track]
        })
    }

    const addAlbumToQueue = async (album: Album | SearchedAlbum) => {
        const tracks = await getTracksByAlbumId(album.id)
        setQueue(prev => [...prev, ...tracks])
    }

    const addArtistToQueue = async (artist: Artist | SearchedArtist) => {
        const tracks = await getTracksByArtistId(artist.id)
        setQueue(prev => [...prev, ...tracks])
    }

    const cleanQueue = () => {
        setQueue([])
    }

    const playNext = () => {
        console.log("playNext")
        setQueue(prev => {
            if (prev.length > 1) {
                const next = prev.slice(1)
                setCurrentTrack(next[0])
                return [...next]
            }
            setCurrentTrack(null)
            return []
        })
    }

    return (
        <PlaybackContext.Provider value={{
            showPlaybackBar,
            setShowPlaybackBar,
            setShowQueue,
            currentPlayerState,
            setCurrentPlayerState,
            queue,
            playNext,
            cleanQueue,
            addTrackToQueue,
            addAlbumToQueue,
            addArtistToQueue
        }}>
            {children}
            {showPlaybackBar &&
                <>
                    <PlaybackBar track={currentTrack} />
                    {showQueue && <Queue tracks={queue} onClose={() => setShowQueue(false)} />}
                </>}

        </PlaybackContext.Provider>
    )
}
