import { collectionBackground, logo } from '@/assets'
import Card from '@/components/Card'
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
                <div className={styles.section}>
                    <h3 className={styles.title}>Albums</h3>
                    <div className={styles.content}>
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                    </div>
                </div>
                <div className={styles.section}>
                    <h3 className={styles.title}>Artists</h3>
                    <div className={styles.content}>
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' isArtist />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                        <Card image={logo} title='Some Title' description='cool song to listen while taking a bath' />
                    </div>
                </div>
            </div>
        </div>
    )
}