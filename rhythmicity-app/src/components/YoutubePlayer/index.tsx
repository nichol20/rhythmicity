import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'

export interface Class<T, A extends any[]> extends Function { new(...args: A): T }

export enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
}

interface Player {
    playVideo: () => void
    pauseVideo: () => void
    getPlayerState: () => PlayerState
    seekTo(seconds: number, allowSeekAhead: boolean): void
    getCurrentTime(): number
    getDuration(): number
    mute(): void
    unMute(): void
    isMuted(): boolean
    setVolume(volume: number): void
    getVolume(): number
}

interface PlayerEvent {
    target: Player
}

interface PlayerOptions {
    videoId: string
    height: string
    width: string
    events: {
        onReady?: (event: PlayerEvent) => void
        onStateChange?: (event: PlayerEvent) => void
    }
}

declare global {
    interface Window {
        YT: {
            Player: Class<Player, [string, PlayerOptions]>
            PlayerState: PlayerState
        }
        onYouTubeIframeAPIReady: (() => void) | null
    }
}

interface YouTubePlayerProps {
    videoId: string
}

export interface YouTubePlayerRef extends Player { }

export const YouTubePlayer = memo(forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
    function YoutubePlayer({ videoId }, ref) {
        const playerRef = useRef<Player | null>(null)
        const [isReady, setIsReady] = useState(false)

        useEffect(() => {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

            window.onYouTubeIframeAPIReady = () => {
                playerRef.current = new window.YT.Player('player', {
                    videoId,
                    width: '300',
                    height: '300',
                    events: {
                        onReady: event => {
                            setIsReady(true)
                        }
                    }
                })
            }

            return () => {
                window.onYouTubeIframeAPIReady = null
            }
        }, [videoId])

        const playVideo = () => playerRef.current!.playVideo()
        const pauseVideo = () => playerRef.current!.pauseVideo()
        const seekTo = (seconds: number, allowSeekAhead: boolean) => playerRef.current!.seekTo(seconds, allowSeekAhead)
        const getPlayerState = () => playerRef.current!.getPlayerState()
        const getCurrentTime = () => playerRef.current!.getCurrentTime()
        const getDuration = () => playerRef.current!.getDuration()
        const mute = () => playerRef.current!.mute()
        const unMute = () => playerRef.current!.unMute()
        const isMuted = () => playerRef.current!.isMuted()
        const getVolume = () => playerRef.current!.getVolume()
        const setVolume = (volume: number) => playerRef.current!.setVolume(volume)

        useImperativeHandle(ref, () => ({
            playVideo: isReady ? playVideo : () => { },
            pauseVideo: isReady ? pauseVideo : () => { },
            seekTo: isReady ? seekTo : () => { },
            getPlayerState: isReady ? getPlayerState : () => PlayerState.CUED,
            getCurrentTime: isReady ? getCurrentTime : () => 0,
            getDuration: isReady ? getDuration : () => 0,
            mute: isReady ? mute : () => { },
            unMute: isReady ? unMute : () => { },
            isMuted: isReady ? isMuted : () => false,
            getVolume: isReady ? getVolume : () => 1,
            setVolume: isReady ? setVolume : () => { }
        }))

        return <div id="player"></div>
    }))
