import { homeBackground } from '@/assets'
import { Header } from '@/components/Header'
import styles from '@/styles/Home.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.titleBox}>
        <h1 className={styles.title}>Rhythmicity</h1>
        <h2 className={styles.subtitle}>the best music platform</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.backgroundContainer}>
          <Image src={homeBackground} alt="background" />
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.bottomBox}>
          <span className={styles.bottomText}>Let the music speak for itself. Explore, discover, and enjoy the sounds that move you.</span>
          <Link href="/collection" className={styles.mainBtn}>
            Collection
          </Link>
        </div>
      </footer>
    </div>
  )
}