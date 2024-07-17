import React from 'react';

import styles from './style.module.scss'

interface CardFallbackProps {
    kind?: 'normal' | 'big'
}

export const CardFallback = ({ kind = "normal" }: CardFallbackProps) => {
    return (
        <div className={styles.card} data-kind={kind}></div>
    )
}
