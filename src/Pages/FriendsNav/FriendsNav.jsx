import { useDispatch, useSelector } from 'react-redux'
import styles from './FriendsNav.module.css'
import { selectUsers } from '../../Store/Slices/UserSlice/UserSlice'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { useEffect, useMemo, useState } from 'react'
import { usersFetch } from '../../Store/Slices/UserSlice/API'
import { logedUserAPI } from '../../Store/Slices/LogedUserSlice/LogedUserAPI'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const FriendsNav = () => {
    const users = useSelector(selectUsers)
    const logedUser = useSelector(logedUserSelect)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const recomendedFriends = useMemo(() => {
        if (!logedUser) return []

        return users
            .filter((user) => {
                if (user.id === logedUser.id) return false
                if (logedUser.friends?.includes(user.id)) return false
                const hasFriendNotification = logedUser.notifications?.some(
                    (notif) => notif.userid === user.id && notif.status === 'friend'
                )
                if (hasFriendNotification) return false

                return true
            })
            .map((user) => {
                const commonFriends = logedUser.friends?.filter((fid) =>
                    user.friends?.includes(fid)
                )?.length || 0

                return { ...user, commonFriends }
            })
            .sort((a, b) => b.commonFriends - a.commonFriends)
    }, [users, logedUser])

    const [localFriends, setLocalFriends] = useState([]);

    useEffect(() => {
        setLocalFriends(recomendedFriends);
    }, [recomendedFriends]);
    useEffect(() => {
        dispatch(usersFetch())
        dispatch(logedUserAPI())
    }, [])
    async function sendNotification(id) {
        const friend = users.find(u => u.id === id);
        if (!friend) return;
        const newNot = {
            id: new Date().toString(),
            userid: logedUser.id,
            status: "friend",
            linkId: id,
            time: new Date().toISOString()
        }
        await axios.patch(`http://localhost:3010/users/${id}`, {
            notifications: [...(friend.notifications || []), newNot]
        });
    }
    return (
        <div className={styles.friendsnav}>
            <h3>People you may know</h3>
            <div className={styles.friends}>
                {localFriends.map((user) => (
                    <div className={styles.oneofRecomendet} key={user.id} >
                        <img
                            src={user.profile_image}
                            alt={`${user.fname} ${user.lname}`}
                            className={styles.avatar}
                        />
                        <div className={styles.userinfo}>
                            <p onClick={() => navigate(`/home/userPage/${user.id}`)}>{user.fname} {user.lname}</p>
                            {user.commonFriends > 0 && (
                                <span>👥 {user.commonFriends} mutual friend{user.commonFriends > 1 ? 's' : ''}</span>
                            )}
                        </div>
                        <button
                            onClick={async () => {
                                await sendNotification(user.id);
                                setLocalFriends(prev => prev.filter(f => f.id !== user.id));
                            }}
                        >
                            + Add
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}