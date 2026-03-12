import { useSelector } from 'react-redux'
import styles from './AddPost.module.css'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import galeryIcon from '../../Asets/galeryAddOpeningIcon.jpg'
import smileYellowIcon from '../../Asets/smileLinesYellow.avif'
import { GottaAddPost } from './GottaAddPost/GottaAddPost'
import { useState } from 'react'
export const AddPost = () => {
    const logedUser = useSelector(logedUserSelect)
    const [openPosting, setOpenPosting] = useState(false)
    return (
        <div className={styles.toOpen}>
            {openPosting && <div className={styles.parent} onClick={() => setOpenPosting(false)}></div>}
            {openPosting && <GottaAddPost setOpenPosting={setOpenPosting} />}
            <div className={styles.addPost} onClick={() => setOpenPosting(true)}>
                <img src={logedUser.profile_image} className={styles.userImage} />
                <input type="text" placeholder="What's on your mind?" />
                <img src={galeryIcon} alt="" />
                <img src={smileYellowIcon} alt="" />
            </div>
        </div>
    )
}