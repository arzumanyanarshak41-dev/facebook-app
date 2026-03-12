import { useSelector } from 'react-redux'
import styles from './Notifications.module.css'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { OneOfNot } from './OneOfNot/OneOfNot'
export const Notifications = ({ setNotificationsOpen }) => {
    const logedUser = useSelector(logedUserSelect)
    return (
        <div className={styles.notifications}>
            {
                logedUser.notifications.length ?
                    logedUser?.notifications.toSorted((a, b) => {
                        const timeA = new Date(a.time).getTime();
                        const timeB = new Date(b.time).getTime();
                        return timeB - timeA;
                    }).map((el, ind) => {
                        return <OneOfNot oneof={el} key={ind} setNotificationsOpen={setNotificationsOpen} />
                    }) :
                    <h2>No Notifications Yet</h2>
            }
        </div>
    )
}