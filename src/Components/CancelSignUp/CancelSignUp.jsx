import styles from './CancelSignUp.module.css'
export const CancelSignUp = ({ setopenCancel }) => {
    return (
        <div>
            <div className={styles.parent}></div>
            <div className={styles.cancelSignUp}>
                <h3>A user with these credentials already exists</h3>
                <h4>Please use a different password or email address</h4>
                <button onClick={() => setopenCancel(false)}>Close</button>
            </div>
        </div>
    )
}