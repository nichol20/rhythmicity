import { ChangeEvent } from 'react'
import styles from './style.module.scss'

interface SliderProps {
    value: number
    progressBarWidth: string | number
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onMouseDown?: () => void
    onMouseUp?: () => void
    activeLayout?: boolean
}

export const Slider = ({ value, progressBarWidth, onChange, onMouseDown, onMouseUp, activeLayout = false }: SliderProps) => {
    return (
        <div className={`${styles.slider} ${activeLayout ? styles.active : ""}`}>
            <div className={styles.container}>
                <div className={styles.progressBar} style={{ width: progressBarWidth }}></div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    className={styles.rangeInput}
                    onChange={onChange}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                />
            </div>
        </div>
    )
}