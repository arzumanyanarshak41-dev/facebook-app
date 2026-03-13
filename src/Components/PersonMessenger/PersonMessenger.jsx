import { useEffect, useRef, useState } from 'react'
import styles from './PersonMessenger.module.css'
import axios from 'axios'
import { Icon } from '../../SVG/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { changeLogedUser } from '../../Store/Slices/LogedUserSlice/ChangeLogedUser'
import { openMess } from '../../Store/Slices/messengerOpenSlicer/messengerOpenSlicer'
import likeIcon from '../../Asets/blue-like-button-icon.webp'
import messegSendAudio from '../../Asets/messageSendAudio.mp3'
import { useNavigate } from 'react-router-dom'
export const PersonMessenger = ({ id, setPerson }) => {
    const logedUser = useSelector(logedUserSelect)
    const [personUser, setPersonUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const ChatsRef = useRef(null)
    const audioPlay = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const api = axios.create({ baseURL: "http://localhost:3010/users/" })

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                setLoading(true)
                const response = await api.get(`${id}`)
                setPersonUser(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPerson()
    }, [id])
    function onSub(e) {
        e.preventDefault();
        if (audioPlay.current) {
            audioPlay.current.play()
        }
        const inputText = e.target[0].value.trim();
        if (!inputText) return;
        dispatch(changeLogedUser({
            senderId: logedUser.id,
            receiverId: personUser.id,
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        e.target.reset();
    }
    const friendMessages = logedUser?.messages?.find(m => m.friendId === personUser?.id)?.message || [];
    useEffect(() => {
        if (ChatsRef.current) {
            ChatsRef.current.scrollTop = ChatsRef.current.scrollHeight
        }
    }, [friendMessages])
    if (!personUser) return <p>User not found</p>

    return (
        !loading ? (
            <div className={styles.messenger}>
                <audio src={messegSendAudio} ref={audioPlay}></audio>
                <div className={styles.top}>
                    <div className={styles.userinfo} onClick={() => navigate(`/home/userPage/${personUser.id}`)}>
                        <img src={personUser.profile_image} alt="" />
                        <div className={styles.persActive}>
                            <h4>{personUser.fname} {personUser.lname}</h4>
                            {personUser.lastSeen === "online" ? (
                                <p className={styles.online}>
                                    <span className={styles.cirlc}></span> {personUser.lastSeen}
                                </p>
                            ) : (
                                <p>last seen {personUser.lastSeen}</p>
                            )}
                        </div>
                    </div>
                    <span onClick={() => {
                        setPerson({ id: null, choosed: false })
                        dispatch(openMess())
                    }}>
                        <Icon name={"xIcon"} size={"30px"} coloricon="#d073ff" />
                    </span>
                </div>

                <div className={styles.chats}>
                    <div className={styles.chats} ref={ChatsRef}>
                        {friendMessages.length > 0 ? (
                            friendMessages.map((m, i) => (
                                <div key={i} className={m.sender === "him" ? styles.messBoxhim : styles.messBoxme}>
                                    {m.text === "like"
                                        ? <img src={likeIcon} alt="" />
                                        : (
                                            <h4>
                                                {m.text.startsWith("http")
                                                    ? <a href={m.text} target="_blank" rel="noreferrer">{m.text}</a>
                                                    : m.text
                                                }
                                            </h4>
                                        )
                                    }
                                    <p>{m.time}</p>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noMessages}>
                                <p>Start Chat 👋</p>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={onSub}>
                    <input type="text" />
                    <img src={likeIcon} alt="" onClick={() => {
                        dispatch(changeLogedUser({
                            senderId: logedUser.id,
                            receiverId: personUser.id,
                            text: 'like',
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }))
                        if (audioPlay.current) {
                            audioPlay.current.play()
                        }
                    }} />
                </form>
            </div>
        ) : (
            <p>...loading</p>
        )
    )
}