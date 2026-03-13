import styles from './Messenger.module.css'
import { Icon } from '../../SVG/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { PersonMessenger } from '../PersonMessenger/PersonMessenger'
import { useNavigate } from 'react-router-dom'
import { setSeen } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { openMess } from '../../Store/Slices/messengerOpenSlicer/messengerOpenSlicer'
export const Messenger = () => {
    const users = useSelector(state => state.users)
    const logedUser = useSelector(state => state.logedUser)
    const [person, setPerson] = useState({ id: null, choosed: false })
    const [filterChats, setFilterChats] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let id;
    useEffect(() => {
        setFilterChats(
            users.filter(u =>
                logedUser?.friends?.includes(u.id) ||
                logedUser?.messages?.some(m => m.friendId === u.id)
            )
        )
    }, [])
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
    function filterChatsFunc(search = "") {
        const filtered = users.filter(u =>
            (logedUser?.friends?.includes(u.id) ||
                logedUser?.messages?.some(m => m.friendId === u.id)) &&
            (`${u.fname} ${u.lname}`.toLowerCase().includes(search.toLowerCase()))
        );
        setFilterChats(filtered);
    }
    return person.choosed ? (
        <PersonMessenger id={person?.id} setPerson={setPerson} />
    ) : (
        <div className={styles.messenger}>
            <div className={styles.top}>
                <h2>Chats</h2>
                <div className={styles.reacts}>
                    <span onClick={() => navigate(`/home/messenger/${id}`)}><Icon name={"Fullscreen"} size={"20px"} /></span>
                    <span onClick={() => dispatch(openMess())}><Icon name={"xIcon"} size={"25px"} /></span>
                </div>
            </div>
            <button className={styles.openSearch}>
                <Icon name={"Search"} size={"20px"} />
                <input type="text" placeholder='Search on messenger' onChange={(e) => filterChatsFunc(e.target.value)} />
            </button>
            <div className={styles.chatFilter}>
                <button onClick={() => {
                    setFilterChats(
                        users.filter(u =>
                            logedUser?.friends?.includes(u.id) ||
                            logedUser?.messages?.some(m => m.friendId === u.id)
                        )
                    )
                }}>
                    All
                </button>
                <button
                    onClick={() => {
                        const unreadIds = logedUser.messages
                            .filter(m => m.seen === true)
                            .map(m => m.friendId)

                        const unreadUsers = users.filter(u =>
                            unreadIds.includes(u.id)
                        )

                        setFilterChats(unreadUsers)
                    }}
                >
                    Unread
                </button>
            </div>
            <div className={styles.chats}>
                {filterChats?.
                    sort((a, b) => {
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