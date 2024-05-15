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

interface QueueController {
    playNext: () => void
    skipTo: (trackId: string) => void
    delete: (trackId: string) => void
    clean: () => void
    addTrack: (track: Track | SearchedTrack) => void
    addAlbum: (album: Album | SearchedAlbum) => Promise<void>
    addArtist: (artist: Artist | SearchedArtist) => Promise<void>
}

interface PlaybackContext {
    showPlaybackBar: boolean
    setShowPlaybackBar: Dispatch<SetStateAction<boolean>>
    setShowQueue: Dispatch<SetStateAction<boolean>>
    currentPlayerState: PlayerState
    setCurrentPlayerState: Dispatch<SetStateAction<PlayerState>>
    currentTrack: SearchedTrack | Track | null
    queue: (Track | SearchedTrack)[]
    queueController: QueueController
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
    const [showQueue, setShowQueue] = useState(false)

    const addTrackToQueue = (track: Track | SearchedTrack) => {
        setQueue(prev => {
            if (prev.length === 0) {
                setCurrentTrack(track)
            }
            return [...prev, track]
        })
    }

    const skipTo = (trackId: string) => {
        setQueue(prev => {
            let trackIndex

            prev.forEach((t, i) => {
                if (t.id === trackId) trackIndex = i
            })

            const newState = prev.slice(trackIndex)
            setCurrentTrack(newState[0])
            return newState
        })
    }

    const deleteFromQueue = (trackId: string) => {
        setQueue(prev => {
            return prev.filter((t, i) => {
                if (t.id === trackId && i === 0) {
                    setCurrentTrack(prev[1])
                    return false
                }

                return t.id !== trackId
            })
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
            currentTrack,
            queue,
            queueController: {
                playNext,
                skipTo,
                delete: deleteFromQueue,
                clean: cleanQueue,
                addTrack: addTrackToQueue,
                addAlbum: addAlbumToQueue,
                addArtist: addArtistToQueue
            }
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
