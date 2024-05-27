import { useState } from "react"
import { ClosableComponent } from "../ClosableElement"

import styles from './style.module.scss'
import Image from "next/image"
import { verticalEllipsisIcon } from "@/assets"

interface RowOptionsProps {
    options: {
        icon: any
        name: string
        description: string
        action: () => void
    }[]
    showBtn?: boolean
}

export const RowOptions = ({ options, showBtn = true }: RowOptionsProps) => {
    const [showOptions, setShowOptions] = useState(false)

    const closeOptions = () => {
        setShowOptions(false)
    }

    return (
        <div className={styles.rowOptions}>
            {showBtn && (
                <button className={styles.optionsBtn} onClick={() => setShowOptions(prev => !prev)}>
                    <Image src={verticalEllipsisIcon} alt="options" />
                </button>
            )}
            <ClosableComponent isOpen={showOptions} close={closeOptions} className={styles.options}>
                {options.map(({ action, description, icon, name }, i) => (
                    <button
                        key={i}
                        className={styles.optionItem}
                        onClick={() => {
                            action()
                            closeOptions()
                        }}
                    >
                        <div className={styles.imgBox}>
                            <Image src={icon} alt={name} />
                        </div>
                        <span className={styles.description}>{description}</span>
                    </button>
                ))}
            </ClosableComponent>
        </div>
    )
}