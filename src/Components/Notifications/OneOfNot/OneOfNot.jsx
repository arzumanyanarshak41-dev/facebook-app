import { useEffect, useState } from "react"
import styles from "./OneOfNot.module.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { logedUserSelect, setFriends } from "../../../Store/Slices/LogedUserSlice/LogedUserSlice"
import { useNavigate } from "react-router-dom"
export const OneOfNot = ({ oneof, setNotificationsOpen }) => {
    const [user, setUser] = useState({})
    const logedUser = useSelector(logedUserSelect)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        async function getUser() {
            const response = await axios.get(`http://localhost:3010/users/${oneof.userid}`)
            setUser(response.data)
        }
        getUser()
    }, [oneof.userid])
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
    const time = getTime(oneof.time)
    async function acceptFriend() {
        const NewNotifications = logedUser?.notifications.filter(el => el.id != oneof.id)
        const newFriends = [...logedUser?.friends, oneof.userid]
        await axios.patch(`http://localhost:3010/users/${logedUser.id}`, {
            notifications: NewNotifications,
            friends: newFriends
        })
        await axios.patch(`http://localhost:3010/users/${oneof.userid}`, {
            friends: [...user?.friends, logedUser.id]
        })
        dispatch(setFriends({ nots: NewNotifications, friends: newFriends }))
    }
    async function deleteNotification() {
        const NewNotifications = logedUser?.notifications.filter(el => el.id != oneof.id)
        await axios.patch(`http://localhost:3010/users/${logedUser.id}`, {
            notifications: NewNotifications,
        })
        dispatch(setFriends({ nots: NewNotifications, friends: logedUser.friends }))
    }
    return (
        <div className={styles.oneOfNot}>
            <img src={user.profile_image} alt="" />
            <div className={styles.notInfo} onClick={() => {
                if (oneof.status == "like" || oneof.status == "comment") {
                    setNotificationsOpen(false)
                    deleteNotification()
                    navigate(`/home/photo/${oneof.linkId}`)
                }
            }}>
                <h4>{user.fname} {user.lname} </h4>
                <p>
                    {oneof.status == "like"
                        ? "Like Your Post"
                        : oneof.status == "friend"
                            ? "Friend Request"
                            : (
                                <>
                                    Commented on the post: <span>{oneof.text.slice(0, 10)}...</span>
                                </>
                            )}
                </p>
                <span>{time}</span>
                {oneof.status == "friend" && <div className={styles.buts}>
                    <button onClick={acceptFriend}>Accept</button>
                    <button onClick={deleteNotification}>Delete</button>
                </div>}
            </div>
        </div >
    )
}