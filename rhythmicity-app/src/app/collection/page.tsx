import { collectionBackground, logo } from '@/assets'
import Card from '@/components/Card'
import Carousel from '@/components/Carousel'
import { Header } from '@/components/Header'
import styles from '@/styles/Collection.module.scss'
import Image from 'next/image'

export default function CollectionPage() {
    return (
        <div className={styles.collectionPage}>
            <Header />
            <div className={styles.bannerContainer}>
                <Image src={collectionBackground} alt="background" />

                <div className={styles.rightSide}>
                    <div className={styles.textBox}>
                        <h1 className={styles.title}>Rhythmicity</h1>
                        <span className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quo reiciendis doloremque incidunt, repudiandae perspiciatis facere ratione excepturi fuga distinctio quia sapiente atque cum porro velit asperiores? Neque, vitae nihil.</span>
                        <button className={styles.btn}>
                            Something
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.collections}>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Albums</h3>
                    <Carousel max={10}>
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                    </Carousel>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Artists</h3>
                    <Carousel max={10}>
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                    </Carousel>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.collectionTitle}>Popular Tracks</h3>
                    <Carousel max={10}>
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={collectionBackground} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} isPlayable title='Some Title' description='cool song to listen while taking a bath' />
                    </Carousel>
                </section>
                
            </div>
        </div>
    )
}