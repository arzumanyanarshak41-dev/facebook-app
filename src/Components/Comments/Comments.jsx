import styles from "./Comments.module.css"
import { selectUsers } from "../../Store/Slices/UserSlice/UserSlice"
import { useSelector } from "react-redux"
export const Comments = ({ comm }) => {
    const users = useSelector(selectUsers)
    const comUser = users.find(el => el.id == comm.sender)
    const getTime = (uploadedAt) => {
        const when = new Date() - new Date(uploadedAt);
        const whenSec = Math.floor(when / 1000);
        const whenMin = Math.floor(whenSec / 60);
        const whenH = Math.floor(whenMin / 60);
        const whenD = Math.floor(whenH / 24);

        if (whenSec < 60) return `${whenSec} sec ago`;
        if (whenMin < 60) return `${whenMin} min ago`;
        if (whenH < 24) return `${whenH} h ago`;
        return `${whenD} d ago`;
    };
    return (
        <div className={styles.oneOf}>
            <div className={styles.combody}>
                <img src={comUser.profile_image} alt="" />
                <div className={styles.infoBox}>
                    <h4>{comUser.fname} {comUser.lname}</h4>
                    <p>{comm.text}</p>
                </div>
            </div>
            <span>{getTime(comm.time)}</span>
        </div>
    )
}