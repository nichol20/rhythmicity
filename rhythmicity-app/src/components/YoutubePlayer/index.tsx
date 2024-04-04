import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'

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
}

declare global {
    interface Window {
        YT: {
            Player: Class<Player, [string, any]>
            PlayerState: PlayerState
        }
        onYouTubeIframeAPIReady: (() => void) | null
    }
}

interface YouTubePlayerProps {
    videoId: string
}

export interface YouTubePlayerRef {
    playVideo: () => void
    pauseVideo: () => void
    getPlayerState: () => number | undefined
}

const YouTubePlayer = memo(forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
    function YoutubePlayer({ videoId }, ref) {
        const playerRef = useRef<Player | null>(null)

        useEffect(() => {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

            window.onYouTubeIframeAPIReady = () => {
                playerRef.current = new window.YT.Player('player', {
                    videoId,
                    width: '0',
                    height: '0',
                    events: {
                        'onReady': (event: any) => { }
                    }
                })
            }

            return () => {
                window.onYouTubeIframeAPIReady = null
            }
        }, [videoId])

        const playVideo = () => playerRef.current?.playVideo()

        const pauseVideo = () => playerRef.current?.pauseVideo()

        const getPlayerState = () => playerRef.current?.getPlayerState()

        useImperativeHandle(ref, () => ({
            playVideo,
            pauseVideo,
            getPlayerState
        }))

        return <div id="player"></div>
    }))

export default YouTubePlayer
