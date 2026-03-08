import styles from './Messenger.module.css'
import { Icon } from '../../SVG/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { PersonMessenger } from '../PersonMessenger/PersonMessenger'
import { useNavigate } from 'react-router-dom'
import { setSeen } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
export const Messenger = () => {
    const users = useSelector(state => state.users)
    const logedUser = useSelector(state => state.logedUser)
    const [person, setPerson] = useState({ id: null, choosed: false })
    const dispatch = useDispatch()
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
                    .sort((a, b) => {
                        const aMsg = logedUser?.messages?.find(m => m.friendId === a.id)?.message || [];
                        const bMsg = logedUser?.messages?.find(m => m.friendId === b.id)?.message || [];
                        const aLast = aMsg.length ? new Date(aMsg[aMsg.length - 1].time) : 0;
                        const bLast = bMsg.length ? new Date(bMsg[bMsg.length - 1].time) : 0;
                        return bLast - aLast;
                    })
                    .map(user => (
                        <div className={styles.personMessenger} key={user.id} onClick={() => {
                            setPerson({ id: user.id, choosed: true })
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
        </div >
    )
}