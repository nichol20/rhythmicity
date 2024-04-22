'use client'
import { PlaybackBar } from "@/components/PlaybackBar";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";
import { getTracksByAlbumId, getTracksByArtistId } from "@/utils/api";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface PlaybackContext {
    showPlaybackBar: boolean
    setShowPlaybackBar: Dispatch<SetStateAction<boolean>>
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
    const [queue, setQueue] = useState<(Track | SearchedTrack)[]>([])

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
        setQueue(prev => {
            if (prev.length > 1) {
                prev.shift()
                console.log(prev)
                setCurrentTrack(prev[0])
                return [...prev]
            }
            setCurrentTrack(null)
            return []
        })
    }

    console.log(queue)

    return (
        <PlaybackContext.Provider value={{
            showPlaybackBar,
            setShowPlaybackBar,
            playNext,
            cleanQueue,
            addTrackToQueue,
            addAlbumToQueue,
            addArtistToQueue
        }}>
            {children}
            {showPlaybackBar && <PlaybackBar track={currentTrack} />}
        </PlaybackContext.Provider>
    )
}
