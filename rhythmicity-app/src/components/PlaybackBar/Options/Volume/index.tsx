import { ChangeEvent, RefObject, useEffect, useState } from 'react'
import Image from 'next/image'

import { Slider } from '@/components/Slider'
import { volumeIcon, volumeDownIcon, volumeOffIcon } from '@/assets'
import { YouTubePlayerRef } from '@/components/YoutubePlayer'
import styles from './style.module.scss'
import { SessionStorageKeys, getFromCache, setToCache } from '@/utils/sessionStorage'

export type VolumeState = "off" | "low" | "high"

interface VolumeProps {
    youtubePlayerRef: RefObject<YouTubePlayerRef>
}

export const Volume = ({ youtubePlayerRef }: VolumeProps) => {
    const [volume, setVolume] = useState(100)
    const [volumeState, setVolumeState] = useState<VolumeState>("high")
    const [activeSliderLayout, setActiveSliderLayout] = useState(false)

    const getVolumeFromStorage = (): number => {
        const cachedVolume = parseInt(getFromCache(SessionStorageKeys.VOLUME))
        if (isNaN(cachedVolume) || cachedVolume > 100 || cachedVolume < 0) return 100
        return cachedVolume
    }

    const handleMouseOver = () => {
        setActiveSliderLayout(true)
    }

    const handleMouseLeave = () => {
        setActiveSliderLayout(false)
    }

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(event.target.value)
        setVolume(newVolume)
        youtubePlayerRef.current?.setVolume(newVolume)
        setToCache(SessionStorageKeys.VOLUME, newVolume)
        setVolumeState(newVolume > 50 ? 'high' : newVolume > 0 ? 'low' : 'off')
    }

    const getVolumeIcon = () => {
        if (volumeState === "high") return volumeIcon
        if (volumeState === "low") return volumeDownIcon
        return volumeOffIcon
    }

    const handleVolumeBtnClick = () => {
        setVolumeState(prev => {
            if (prev === "high" || prev === "low") {
                setVolume(0)
                youtubePlayerRef.current?.mute()
                return "off"
            }

            const cachedVolume = getVolumeFromStorage()
            youtubePlayerRef.current?.unMute()
            setVolume(cachedVolume)
            return cachedVolume > 50 ? "high" : "low"
        })
    }

    useEffect(() => {
        const cachedVolume = getVolumeFromStorage()
        setVolume(cachedVolume)
        setVolumeState(cachedVolume > 50 ? 'high' : cachedVolume > 0 ? 'low' : 'off')
    }, []);

    return (
        <div className={styles.volume} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <button className={styles.volumeBtn} onClick={handleVolumeBtnClick}>
                <Image src={getVolumeIcon()} alt="volume" />
            </button>
            <Slider value={volume} progressBarWidth={volume} activeLayout={activeSliderLayout} onChange={handleVolumeChange} />
        </div>
    )
}