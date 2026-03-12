import { Outlet, useNavigate } from 'react-router-dom'
import styles from './FullScreenMessenger.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../SVG/Icon'
import { useEffect, useState } from 'react'
import { setSeen } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { logedUserAPI } from '../../Store/Slices/LogedUserSlice/LogedUserAPI'
import { usersFetch } from '../../Store/Slices/UserSlice/API'
export const FullScreenMessenger = () => {
    const users = useSelector(state => state.users)
    const logedUser = useSelector(state => state.logedUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [])
    const [mobileOpen, setMobileOpen] = useState(true)
    async function isSeen(friendId) {

        const updatedMessages = logedUser.messages.map(m =>
            m.friendId === friendId
                ? { ...m, seen: false }
                : m
        )

        await fetch(`http://localhost:3010/users/${logedUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: updatedMessages
            })
        })
        dispatch(setSeen(friendId))
    }
    return (
        <div className={styles.fullScreenMessenger}>
            <div className={mobileOpen ? `${styles.showFriends} ${styles.active}` : styles.showFriends}>
                <div className={styles.top}>
                    <h2>Chats</h2>
                </div>
                <button className={styles.openSearch}>
                    <Icon name={"Search"} size={"20px"} />
                    <p>Search on messenger</p>
                </button>
                <div className={styles.chatFilter}>
                    <button>All</button>
                    <button>Unread</button>
                </div>
                <div className={styles.chats}>
                    {users
                        .filter(u =>
                            logedUser?.friends?.includes(u.id) ||
                            logedUser?.messages?.some(m => m.friendId === u.id)
                        ).map(user => (
                            <div className={styles.personMessenger} key={user.id} onClick={() => {
                                navigate(`/home/messenger/${user.id}`)
                                setMobileOpen(false)
                                isSeen(user.id)
                            }}>
                                <img src={user.profile_image} alt="" />
                                <div className={styles.personInfo}>
                                    <h4>{user.fname} {user.lname}</h4>
                                    {
                                        logedUser?.messages?.some(
                                            el => el.friendId === user.id && el.seen === false
                                        ) ?
                                            < p > message... <span>{user.lastSeen}</span></p> :
                                            < h4 className={styles.h4}> <p>message...</p> <span className={styles.circle}></span><span>{user.lastSeen}</span></h4>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Outlet context={{ setMobileOpen }} />
        </div>
    )
}