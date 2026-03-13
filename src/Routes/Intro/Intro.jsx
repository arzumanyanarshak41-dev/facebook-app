import styles from './Intro.module.css'
import FBLogo from '../../Asets/Facebook_f_logo_(2021).svg.png'
import ArshakLogo from '../../Asets/ArshakLogo.png'

export const Intro = () => {
    return (
        <div className={styles.Intro}>
            <div className={styles.logoBox}>
                <img src={FBLogo} className={styles.fbLogo} />
                <h2 className={styles.fbText}>Facebook</h2>
            </div>
            <div className={styles.infoBox}>
                <h3>From</h3>
                <img src={ArshakLogo} />
            </div>
        </div>
    )
}