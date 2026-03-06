import styles from './Messenger.module.css'
import { Icon } from '../../SVG/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { PersonMessenger } from '../PersonMessenger/PersonMessenger'
import { useNavigate } from 'react-router-dom'
export const Messenger = () => {
    const users = useSelector(state => state.users)
    const logedUser = useSelector(state => state.logedUser)
    const [person, setPerson] = useState({ id: null, choosed: false })
    const navigate = useNavigate()
    let id;
    useEffect(() => {
        if (!id && users.length > 0) {
            const firstFriend = users.find(u => logedUser?.friends?.includes(u.id))
            if (firstFriend) {
                id = firstFriend.id
                return
            }
        }
    }, [id, users, logedUser])
    return person.choosed ? (
        <PersonMessenger id={person?.id} setPerson={setPerson} />
    ) : (
        <div className={styles.messenger}>
            <div className={styles.top}>
                <h2>Chats</h2>
                <span onClick={() => navigate(`/home/messenger/${id}`)}><Icon name={"Fullscreen"} size={"20px"} /></span>
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
                    )
                    .map(user => (
                        <div className={styles.personMessenger} key={user.id} onClick={() => setPerson({ id: user.id, choosed: true })}>
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
    )
}