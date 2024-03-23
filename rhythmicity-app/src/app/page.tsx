import { homeBackground } from '@/assets'
import { Header } from '@/components/Header'
import styles from '@/styles/Home.module.scss'
import Image from 'next/image'

export default function Home() {
  
  return (
    <div className={styles.home}>
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
          <span className={styles.bottomTitle}>some fucking stupid title</span>
          <span className={styles.bottomText}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt inventore laudantium, sapiente similique, qui nisi officia cumque fuga quisquam nostrum corporis illo quam excepturi voluptates nemo minima.</span>
          <button className={styles.mainBtn}>
            Collection
          </button>
        </div>
      </footer>
    </div>
  )
}