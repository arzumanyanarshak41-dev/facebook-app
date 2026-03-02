import styles from './Messenger.module.css'
import { Icon } from '../../SVG/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { PersonMessenger } from '../PersonMessenger/PersonMessenger'
export const Messenger = () => {
    const [users, logedUser] = useSelector(state => [state.users, state.logedUser])
    const [person, setPerson] = useState({ id: null, choosed: false })
    return person.choosed ? (
        <PersonMessenger id={person?.id} setPerson={setPerson} />
    ) : (
        <div className={styles.messenger}>
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
                    .filter(el => logedUser?.friends?.includes(el.id))
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