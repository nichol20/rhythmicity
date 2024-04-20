'use client'
import React, { useState } from 'react';
import styles from './style.module.scss'
import Image, { StaticImageData } from 'next/image';
import { playIcon } from '@/assets';

interface CardProps {
    image: StaticImageData | string
    title: string
    description: string
    onPlay?: () => void
    isArtist?: boolean
    isPlayable?: boolean
    kind?: 'normal' | 'big'
}

export const Card = ({ image, title, description, onPlay, isArtist = false, isPlayable = false, kind = "normal" }: CardProps) => {
    return (
        <div className={styles.card} data-kind={kind}>
            <div className={styles.container}>
                <div className={styles.imageBox} data-card-type={isArtist ? "artist" : ""}>
                    <div className={styles.boxContent}>
                        <Image src={image} alt={title} width={300} height={300} />
                    </div>
                </div>
                <div className={styles.details}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
            {isPlayable && (
                <button className={styles.playBtn} onClick={onPlay}>
                    <Image src={playIcon} alt="play" />
                </button>
            )}
        </div>
    );
};
