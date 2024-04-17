'use client'
import React, { useState, useEffect, ReactNode, Children, useRef } from 'react'

import styles from './style.module.scss'

interface CarouselProps {
    children: ReactNode
    max: number
}

export const Carousel = ({ children, max }: CarouselProps) => {
    const [items, setItems] = useState(Children.toArray(children))
    const [displayItems, setDisplayItems] = useState<any[]>([])
    const carouselRef = useRef<HTMLDivElement>(null)
    const [numberOfVisibleItems, setNumberOfVisibleItems] = useState(max)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const calculateVisibleItems = () => {
            if (carouselRef.current && carouselRef.current.children.length > 0) {
                const carouselWidth = carouselRef.current.offsetWidth
                const result = Math.floor(carouselWidth / (carouselRef.current.children[0] as HTMLElement)?.offsetWidth)
                setNumberOfVisibleItems(result > max ? max : result)
            } else {
                setTimeout(calculateVisibleItems, 10)
            }
        }

        calculateVisibleItems()
        window.addEventListener('resize', calculateVisibleItems)

        return () => {
            window.removeEventListener('resize', calculateVisibleItems)
        }
    }, [max])

    useEffect(() => {
        setItems(Children.toArray(children))
    }, [children])

    useEffect(() => {
        setDisplayItems(items.slice(0, numberOfVisibleItems))
    }, [items, numberOfVisibleItems])

    const prevItem = () => {
        const prevIndex = items.indexOf(displayItems[0]) - 1
        setDisplayItems(prev => [items[prevIndex === -1 ? items.length - 1 : prevIndex], ...prev.slice(0, prev.length - 1)])
    }

    const nextItem = () => {
        const nextIndex = items.indexOf(displayItems[displayItems.length - 1]) + 1
        setDisplayItems(prev => [...prev.slice(1, prev.length), items[nextIndex === items.length ? 0 : nextIndex]])
    }

    return (
        <div
            className={styles.carousel}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <>
                    <div className={`${styles.chevronBox} ${styles.backward}`} onClick={prevItem}>
                        <div></div>
                    </div>
                    <div className={`${styles.chevronBox} ${styles.forward}`} onClick={nextItem}>
                        <div></div>
                    </div>
                </>
            )}
            <div className={styles.carouselInner} ref={carouselRef}>
                {displayItems.map(item => item)}
            </div>
        </div>
    )
}
