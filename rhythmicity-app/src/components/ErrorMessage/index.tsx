
import Image from 'next/image'

import { errorIcon } from '@/assets'

import styles from './styles.module.scss'

interface ErrorMessageProps {
    message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className={styles.errorMessage}>
            <Image src={errorIcon} alt="error" />
            <span>{message}</span>
        </div>
    )
}