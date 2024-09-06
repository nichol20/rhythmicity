import styles from './styles.module.scss'

interface HighlightedMessageProps {
    message: string
}

export const HighlightedMessage = ({ message }: HighlightedMessageProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.message}>{message}</span>
        </div>
    )
}