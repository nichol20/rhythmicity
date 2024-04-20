'use client'
import { PlaybackBar } from "@/components/PlaybackBar";
import { SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface PlaybackContext {
    showPlaybackBar: boolean
    setShowPlaybackBar: Dispatch<SetStateAction<boolean>>
    addTrackToQueue: (track: Track | SearchedTrack) => void
    playNext: () => void
}

interface PlaybackProviderProps {
    children: ReactNode
}

export const PlaybackContext = createContext({} as PlaybackContext)

export const usePlayback = () => useContext(PlaybackContext)

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

    const playNext = () => {
        setQueue(prev => {
            if (prev.length > 1) {
                prev.shift()
                setCurrentTrack(prev[0])
                return [...prev]
            }
            setCurrentTrack(null)
            return []
        })
    }

    console.log(queue)

    return (
        <PlaybackContext.Provider value={{ showPlaybackBar, setShowPlaybackBar, addTrackToQueue, playNext }}>
            {children}
            {showPlaybackBar && <PlaybackBar track={currentTrack} />}
        </PlaybackContext.Provider>
    )
}
