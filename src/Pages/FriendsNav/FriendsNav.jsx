import { useSelector } from 'react-redux'
import styles from './FriendsNav.module.css'
import { selectUsers } from '../../Store/Slices/UserSlice/UserSlice'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { useEffect, useState } from 'react'
export const FriendsNav = () => {
    const users = useSelector(selectUsers)
    const logedUser = useSelector(logedUserSelect)
    const [friendData, setFriendsData] = useState()
    useEffect(() => {
        setFriendsData(users?.filter(el => logedUser?.friends?.includes(el.id)))
    }, [])
    return (
        <div className={styles.friendsnav}>
            <div className={styles.friends}>
                {
                    friendData?.map(el => {
                        return (
                            <div className={styles.oneofFriends} key={el.id}>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}