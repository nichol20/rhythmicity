'use client'
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import { playIcon } from '@/assets';

import styles from './style.module.scss'

interface CardProps {
    image: StaticImageData | string
    title: string
    href: string
    description: string
    onPlay?: () => void
    isArtist?: boolean
    isPlayable?: boolean
    kind?: 'normal' | 'big'
    className?: string
}

export const Card = ({
    image,
    title,
    href,
    description,
    onPlay,
    isArtist = false,
    isPlayable = false,
    kind = "normal",
    className
}: CardProps) => {
    const handlePlay = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (onPlay) onPlay()
    }

    return (
        <Link href={href} className={`${styles.card} ${className ?? ""}`} data-kind={kind}>
            <div className={styles.container}>
                <div className={styles.imageBox} data-card-type={isArtist ? "artist" : ""}>
                    <div className={styles.boxContent}>
                        <Image src={image} alt={title} width={300} height={300} />
                    </div>
                </div>
                <div className={styles.details}>
                    <h5 className={styles.title}>{title}</h5>
                    <span className={styles.description}>{description}</span>
                </div>
            </div>
            {isPlayable && (
                <button className={styles.playBtn} onClick={handlePlay}>
                    <Image src={playIcon} alt="play" />
                </button>
            )}
        </Link>
    );
};
