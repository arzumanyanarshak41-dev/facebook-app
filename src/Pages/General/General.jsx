import { useDispatch, useSelector } from 'react-redux'
import styles from './General.module.css'
import { useEffect } from 'react'
import { usersFetch } from '../../Store/Slices/UserSlice/API'
import { Messenger } from '../../Components/Messenger/Messenger'
import { logedUserAPI } from '../../Store/Slices/LogedUserSlice/LogedUserAPI'
import { Publication } from '../../Components/Publication/Publication'
import { GeneralRightSide } from '../../Components/GeneralRightSide/GeneralRightSide'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { AddPost } from '../../Components/AddPost/AddPost'
import { useNavigate } from 'react-router-dom'

export const General = () => {
    const [users, messOpen] = useSelector(state => [state.users, state.messengerOpen])
    const logedUser = useSelector(logedUserSelect)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(usersFetch())
        dispatch(logedUserAPI())
    }, [dispatch])

    const allPhotos = [];
    users?.forEach(user => {
        user.photos.forEach(photo => {
            allPhotos.push({
                ...photo,
                userid: user.id,
                fname: user.fname,
                lname: user.lname,
                profile_image: user.profile_image
            });
        });
    });

    const sortedPhotos = allPhotos.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at))
    return (
        <div className="container">
            <div className={styles.general}>
                <GeneralRightSide />
                {messOpen && <Messenger />}
                <div className={styles.publications}>
                    <AddPost />
                    {sortedPhotos?.map((el, ind) => {
                        return (
                            <Publication photo={el} key={ind} />
                        )
                    })}
                </div>
                <div className={styles.friendsInGeneral}>
                    <h3>Friends</h3>
                    <div className={styles.friendsBox}>
                        {
                            users.filter(el => logedUser.friends?.includes(el.id)).map(user => {
                                return (
                                    <div className={styles.friendInGeneral} key={user.id} onClick={() => navigate(`/home/messenger/${user.id}`)}>
                                        <div className={styles.userimage}>
                                            <img src={user.profile_image} alt="" />
                                            {user.lastSeen == "online" ? <div className={styles.activeCircle}></div> : <></>}
                                        </div>
                                        <p>{user.fname} {user.lname}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}