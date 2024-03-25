'use client'
import React, { useState } from 'react';
import styles from './style.module.scss'
import Image, { StaticImageData } from 'next/image';

interface CardProps {
    image: StaticImageData
    title: string
    description: string
    isArtist?: boolean
}

const Card = ({ image, title, description, isArtist=false }: CardProps) => {
  return (
    <div className={styles.card}>
        <div className={styles.container}>
            <div className={styles.imageBox} data-card-type={isArtist ? "artist": ""}>
                <div className={styles.boxContent}>
                    <Image src={image} alt={title}/>
                </div>
            </div>
            <div className={styles.details}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    </div>
  );
};

export default Card;
