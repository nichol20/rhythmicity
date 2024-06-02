import Image from 'next/image'

import { closeIcon } from '@/assets'
import { ClosableComponent } from '../ClosableElement'

import styles from './style.module.scss'

interface ModalProps {
    className?: string
    children: React.ReactNode
    close: () => void
    title?: string
}

export const Modal = ({ className, children, close, title }: ModalProps) => {

    className = className ? className : ''

    return (
        <div className={`${styles.fixedBox}`}>
            <ClosableComponent isOpen={true} close={close}>
                <div className={`${styles.modal} ${className}`}>
                    <div className={styles.relativeBox}>
                        <div className={styles.header}>
                            <span className={styles.title}>{title}</span>
                            <button className={styles.closeBtn} onClick={close}>
                                <Image src={closeIcon} alt="close" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </ClosableComponent>
        </div>
    )
}