import { closeIcon } from '@/assets'
import styles from './style.module.scss'
import Image from 'next/image'

interface ModalProps {
    className?: string
    children: React.ReactNode
    onClose: () => void
}

export const Modal = ({ className, children, onClose }: ModalProps) => {

    className = className ? className : ''

    return (
        <div className={`${styles.fixedBox} ${className}`}>
            <div className={styles.modal}>
                <div className={styles.relativeBox}>
                    <div className={styles.header}>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <Image src={closeIcon} alt="close" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}