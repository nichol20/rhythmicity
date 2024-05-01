import { closeIcon } from '@/assets'
import styles from './style.module.scss'
import Image from 'next/image'

interface ModalProps {
    className?: string
    children: React.ReactNode
    onClose: () => void
    title?: string
}

export const Modal = ({ className, children, onClose, title }: ModalProps) => {

    className = className ? className : ''

    return (
        <div className={`${styles.fixedBox}`}>
            <div className={`${styles.modal} ${className}`}>
                <div className={styles.relativeBox}>
                    <div className={styles.header}>
                        <span className={styles.title}>{title}</span>
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