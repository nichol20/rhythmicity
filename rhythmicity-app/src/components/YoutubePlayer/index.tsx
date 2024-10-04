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

export interface Player {
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
    cueVideoById(videoId: string, startSeconds: number): void
    loadVideoById(videoId: string, startSeconds: number): void
    i: {
        g: (string | Function)[]
    }
}

export interface EventObject {
    target: Player
}

export type PlayerEvent =
    | "onReady"
    | "onStateChange"
    | "onPlaybackQualityChange"
    | "onPlaybackRateChange"
    | "onError"
    | "onApiChange"

export interface PlayerOptions {
    videoId: string
    height: string
    width: string
    events: {
        onReady?: (event: EventObject) => void
        onStateChange?: (event: EventObject) => void
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
    onStateChange: PlayerOptions["events"]["onStateChange"]
}

export interface YouTubePlayerRef extends Player { }

export const YouTubePlayer = memo(forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
    function YoutubePlayer({ onStateChange }, ref) {
        const playerRef = useRef<Player | null>(null)
        const [isReady, setIsReady] = useState(false)

        useEffect(() => {
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            }

            window.onYouTubeIframeAPIReady = () => {
                playerRef.current = new window.YT.Player('player', {
                    videoId: "",
                    width: '0',
                    height: '0',
                    events: {
                        onReady: event => {
                            setIsReady(true)
                        },
                        onStateChange
                    }
                })
            }
        }, [onStateChange])


        useEffect(() => {
            // manually managing the change of event listeners, because I couldn't find any other way that worked
            // the g property in the youtube player object contains an array with all added event listeners
            if (playerRef.current) {
                const eventIndex = playerRef.current.i.g.indexOf('onStateChange')
                if (eventIndex !== -1 && onStateChange) {
                    playerRef.current.i.g[eventIndex + 1] = onStateChange
                }
            }
        }, [onStateChange])

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
        const cueVideoById = (videoId: string, startSeconds: number) => playerRef.current!.cueVideoById(videoId, startSeconds)
        const loadVideoById = (videoId: string, startSeconds: number) => playerRef.current!.loadVideoById(videoId, startSeconds)

        useImperativeHandle(ref, () => ({
            playVideo: isReady ? playVideo : () => { },
            pauseVideo: isReady ? pauseVideo : () => { },
            seekTo: isReady ? seekTo : () => { },
            getPlayerState: isReady ? getPlayerState : () => PlayerState.UNSTARTED,
            getCurrentTime: isReady ? getCurrentTime : () => 0,
            getDuration: isReady ? getDuration : () => 0,
            mute: isReady ? mute : () => { },
            unMute: isReady ? unMute : () => { },
            isMuted: isReady ? isMuted : () => false,
            getVolume: isReady ? getVolume : () => 1,
            setVolume: isReady ? setVolume : () => { },
            cueVideoById: isReady ? cueVideoById : () => { },
            loadVideoById: isReady ? loadVideoById : () => { },
            addEventListener: isReady ? addEventListener : () => { },
            removeEventListener: isReady ? removeEventListener : () => { },
            i: {
                g: []
            }
        }))

        return <div id="player"></div>
    }))
