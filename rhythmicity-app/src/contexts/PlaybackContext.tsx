'use client'
import { PlaybackBar } from "@/components/PlaybackBar";
import { Queue } from "@/components/Queue";
import { PlayerState, YouTubePlayerRef } from "@/components/YoutubePlayer";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";
import { getTracksByAlbumId, getTracksByArtistId } from "@/utils/api";
import { shuffleArray } from "@/utils/array";
import { Dispatch, ReactNode, RefObject, SetStateAction, createContext, useContext, useEffect, useState } from "react";

export enum PlaybackMode {
    NORMAL,
    RANDOM,
    LOOP,
    LOOPONE
}

interface QueueController {
    playNow: (track: Track | SearchedTrack) => void
    playNext: () => void
    skipTo: (trackId: string) => void
    delete: (trackId: string) => void
    resetTime: () => void
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
    playbackMode: PlaybackMode
    setPlaybackMode: Dispatch<SetStateAction<PlaybackMode>>

    currentBarTime: number
    setCurrentBarTime: Dispatch<SetStateAction<number>>
    trackDuration: number
    setTrackDuration: Dispatch<SetStateAction<number>>

    currentTrack: SearchedTrack | Track | null
    playerRef: RefObject<YouTubePlayerRef> | null
    setPlayerRef: Dispatch<SetStateAction<RefObject<YouTubePlayerRef> | null>>
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
    const [currentBarTime, setCurrentBarTime] = useState(0)
    const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(PlaybackMode.NORMAL)
    const [trackDuration, setTrackDuration] = useState(0)
    const [queue, setQueue] = useState<(Track | SearchedTrack)[]>([])
    const [showQueue, setShowQueue] = useState(false)
    const [playerRef, setPlayerRef] = useState<RefObject<YouTubePlayerRef> | null>(null)

    const playNow = (track: Track | SearchedTrack) => {
        setCurrentTrack(track)
        setQueue([track])
    }

    const resetTime = () => {
        setCurrentBarTime(0)
        playerRef?.current?.seekTo(0, true)
    }

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
        setQueue(prev => {
            if (prev.length === 0) {
                setCurrentTrack(tracks[0])
            }

            return [...prev, ...tracks]
        })
    }

    const addArtistToQueue = async (artist: Artist | SearchedArtist) => {
        const tracks = await getTracksByArtistId(artist.id)
        setQueue(prev => {
            if (prev.length === 0) {
                setCurrentTrack(tracks[0])
            }

            return [...prev, ...tracks]
        })
    }

    const cleanQueue = () => {
        setQueue([])
    }

    const playNext = () => {
        setQueue(prev => {
            let next: (Track | SearchedTrack)[] = []

            if (playbackMode === PlaybackMode.NORMAL) {
                next = prev.slice(1)
            } else if (playbackMode === PlaybackMode.RANDOM) {
                next = shuffleArray(prev)
            } else if (playbackMode === PlaybackMode.LOOP) {
                next = prev.slice(1)
                next = [...next, prev[0]]
            } else if (playbackMode === PlaybackMode.LOOPONE) {
                next = prev
            }

            setTrackDuration(0)

            if (next[0]) {
                setCurrentTrack(next[0])
                return [...next]
            }

            setCurrentTrack(null)
            return []
        })
    }

    // console.log(playbackMode)

    return (
        <PlaybackContext.Provider value={{
            showPlaybackBar,
            setShowPlaybackBar,
            setShowQueue,
            currentPlayerState,
            setCurrentPlayerState,
            playbackMode,
            setPlaybackMode,
            currentBarTime,
            setCurrentBarTime,
            trackDuration,
            setTrackDuration,
            currentTrack,
            playerRef,
            setPlayerRef,
            queue,
            queueController: {
                playNext,
                playNow,
                skipTo,
                delete: deleteFromQueue,
                resetTime,
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
                    {showQueue && <Queue tracks={queue} close={() => setShowQueue(false)} />}
                </>}

        </PlaybackContext.Provider>
    )
}
