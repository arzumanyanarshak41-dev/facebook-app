import { Outlet, useNavigate } from 'react-router-dom'
import styles from './FullScreenMessenger.module.css'
import { useSelector } from 'react-redux'
import { Icon } from '../../SVG/Icon'
import { useState } from 'react'
export const FullScreenMessenger = () => {
    const users = useSelector(state => state.users)
    const logedUser = useSelector(state => state.logedUser)
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)
    return (
        <div className={styles.fullScreenMessenger}>
            <div className={mobileOpen ? `${styles.showFriends} ${styles.active}` : styles.showFriends}>
                <div className={styles.top}>
                    <h2>Chats</h2>
                    <Icon name={"Fullscreen"} size={"20px"} />
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
                            }}>
                                <img src={user.profile_image} alt="" />
                                <div className={styles.personInfo}>
                                    <h4>{user.fname} {user.lname}</h4>
                                    <p>message... <span>{user.lastSeen}</span></p>
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