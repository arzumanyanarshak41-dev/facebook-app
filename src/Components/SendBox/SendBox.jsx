import styles from './SendBox.module.css'
import copyImage from '../../Asets/CopyIcon.png'
import { useRef } from 'react'
export const SendBox = ({ url, setOpenSendBox }) => {
    const inputRef = useRef()
    const handleCopy = () => {
        navigator.clipboard.writeText(inputRef.current.value)
        setOpenSendBox(false)
    }
    return (
        <div className={styles.sendBox}>
            <div className={styles.parent} onClick={() => setOpenSendBox(false)}></div>
            <div className={styles.urlBox}>
                <input type="text" defaultValue={url} ref={inputRef} readOnly />
                <img src={copyImage} alt="" onClick={handleCopy} />
            </div>
        </div>
    )
}