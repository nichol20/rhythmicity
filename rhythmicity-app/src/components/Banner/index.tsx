import Image from 'next/image'

import styles from './style.module.scss'

interface BannerProps {
    picture: string
    type: string
    title: string
    description: string
    metadata: string[]
}

export const Banner = ({ picture, type, title, description, metadata }: BannerProps) => {
    return (
        <div className={styles.banner}>
            <div className={styles.pictureBox}>
                <Image src={picture} alt={title} width={300} height={300} />
            </div>
            <div className={styles.info}>
                <span className={styles.type}>{type}</span>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.description}>
                    {description}
                </span>
                <div className={styles.metadata}>
                    {metadata.join(" • ")}
                </div>
            </div>
        </div>
    )
}