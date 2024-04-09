'use client'
import { PlaybackBar } from "@/components/PlaybackBar";
import { Track } from "@/types/track";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface PlaybackContext {
    showPlaybackBar: boolean
    setShowPlaybackBar: Dispatch<SetStateAction<boolean>>
    addTrackToQueue: (track: Track) => void
}

interface PlaybackProviderProps {
    children: ReactNode
}

export const PlaybackContext = createContext({} as PlaybackContext)

export const usePlayback = () => useContext(PlaybackContext)

export const PlaybackProvider = ({ children }: PlaybackProviderProps) => {
    const [showPlaybackBar, setShowPlaybackBar] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<Track>()
    const [queue, setQueue] = useState<Track[]>([])

    const addTrackToQueue = (track: Track) => {
        setQueue(prev => [...prev, track])
    }

    return (
        <PlaybackContext.Provider value={{ showPlaybackBar, setShowPlaybackBar, addTrackToQueue }}>
            {children}
            {showPlaybackBar && <PlaybackBar />}
        </PlaybackContext.Provider>
    )
}
