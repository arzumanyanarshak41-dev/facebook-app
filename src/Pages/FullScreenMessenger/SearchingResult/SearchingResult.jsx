import { memo } from 'react'
import styles from './SearchingResult.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logedUserSelect } from '../../../Store/Slices/LogedUserSlice/LogedUserSlice'

export const SearchingResult = memo(({ result, setSearchText }) => {
    const logedUser = useSelector(logedUserSelect)
    const navigate = useNavigate()
    return (
        <div className={styles.searchingResult}>
            {result.map(user => (
                <div
                    className={styles.personMessenger}
                    key={user.id}
                    onClick={() => {
                        setSearchText("")
                        navigate(`/home/messenger/${user.id}`)
                    }}
                >
                    <img src={user.profile_image} alt="" />
                    <div className={styles.personInfo}>
                        <h4>{user.fname} {user.lname}</h4>
                        {logedUser?.messages?.some(
                            el => el.friendId === user.id && el.seen === false
                        ) ? (
                            <span>{user.lastSeen}</span>
                        ) : (
                            <h4 className={styles.h4}>
                                <span>{user.lastSeen}</span>
                                <span className={styles.circle}></span>
                            </h4>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
})