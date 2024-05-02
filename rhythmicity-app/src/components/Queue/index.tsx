import { SearchedTrack } from '@/types/search'
import { Modal } from '../Modal'
import styles from './style.module.scss'
import { Track } from '@/types/track'
import { QueueTrackRow } from './QueueTrackRow'

interface QueueProps {
    tracks: (SearchedTrack | Track)[]
    onClose: () => void
}

export const Queue = ({ tracks, onClose }: QueueProps) => {

    return (
        <Modal className={styles.modal} onClose={onClose} title='Queue'>
            <div className={styles.queue}>
                {tracks.length > 0
                    ? (<>
                        <section className={styles.queueSection}>
                            <h4 className={styles.queueSubtitle}>Playing now</h4>
                            <QueueTrackRow track={tracks[0]} />
                        </section>
                        <section className={styles.queueSection}>
                            <h4 className={styles.queueSubtitle}>Next</h4>
                            {tracks.slice(1).map((t, i) => <QueueTrackRow track={t} key={t.id} />)}
                        </section>
                    </>)
                    : <span className={styles.addToQueueMessage}>Nothing here. Add a track to listen</span>
                }
            </div>
        </Modal>
    )
}