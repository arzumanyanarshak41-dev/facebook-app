import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './PhotoWindow.module.css'
import commentSendAudio from '../../Asets/commentSendAudio.mp3'
import SendIcon from '../../Asets/sendIcon.png'
import blueLikeIcon from '../../Asets/blue-like-button-icon.webp'
import tLikeIcon from "../../Asets/tLike.png"
import likeAudio from '../../Asets/likeing.mp3'
import WhoLikeIcon from '../../Asets/LikeForShowHow.png'
import tSendIcon from '../../Asets/tSend.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../../Store/Slices/UserSlice/UserSlice'
import { Comments } from '../Comments/Comments'
import { useEffect, useRef, useState } from 'react'
import { addComment } from '../../Store/Slices/UserSlice/AddComment'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { Icon } from '../../SVG/Icon'
import { usersChange } from '../../Store/Slices/UserSlice/UsersChange'
import axios from 'axios'
import { SendBox } from '../SendBox/SendBox'
import { logedUserAPI } from '../../Store/Slices/LogedUserSlice/LogedUserAPI'
import { usersFetch } from '../../Store/Slices/UserSlice/API'
export const PhotoWindow = () => {
    const { id } = useParams()
    const photoID = id
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [dispatch])
    const users = useSelector(selectUsers)
    const logedUser = useSelector(logedUserSelect)
    const [openSendBox, setOpenSendBox] = useState(false)
    const audioPlay = useRef(null)
    const navigate = useNavigate()
    const [likedUsersNames, setLikedUsersNames] = useState([]);
    const likeAudioPaly = useRef(null)
    const user = users.find(user => user.photos.some(phot => phot?.id == photoID))
    const photo = users.reduce((acc, user) => {
        if (acc) return acc;
        const found = user.photos.find(p => p.id === photoID);
        if (found) {
            return { ...found, userid: user.id, profile_image: user.profile_image, fname: user.fname, lname: user.lname };
        }
        return null;
    }, null);
    const getLikedUsers = async (array) => {
        if (!array || array.length === 0) return [];
        const names = [];
        for (const id of array) {
            const res = await axios.get(`http://localhost:3010/users/${id}`);
            names.push(`${res.data.fname} ${res.data.lname}`);
        }
        return names;
    };
    const showLikedUsers = async () => {
        const names = await getLikedUsers(photo.likes);
        setLikedUsersNames(names);
    };
    useEffect(() => {
        if(!photo) return;
        showLikedUsers()
    }, [photo])
    const getTime = (uploadedAt) => {
        const when = new Date() - new Date(uploadedAt);
        const whenSec = Math.floor(when / 1000);
        const whenMin = Math.floor(whenSec / 60);
        const whenH = Math.floor(whenMin / 60);
        const whenD = Math.floor(whenH / 24);

        if (whenSec < 60) return `${whenSec} sec ago`;
        if (whenMin < 60) return `${whenMin} min ago`;
        if (whenH < 24) return `${whenH} h ago`;
        return `${whenD} d ago`;
    };
    const time = getTime(photo?.uploaded_at)
    function onSub(e) {
        e.preventDefault()
        if (audioPlay.current) {
            audioPlay.current.play()
        }
        const comment = e.target[0].value.trim()
        dispatch(addComment({ whoId: photo.userid, photoId: photo.id, newComment: { sender: logedUser.id, text: comment, time: new Date().toISOString() } }))
        e.target.reset()
    }
    return (
        <div className={styles.photoWindow}>
            {openSendBox && <SendBox url={window.location.href} setOpenSendBox={setOpenSendBox}/>}
            <audio src={commentSendAudio} ref={audioPlay}></audio>
            <audio src={likeAudio} ref={likeAudioPaly}></audio>
            <img src={photo?.url} alt="" />
            <div className={styles.comments}>
                <span onClick={() => navigate(-1)}><Icon name={"xIcon"} size={"25px"} /></span>
                <div className={styles.userinfo}>
                    <img src={user?.profile_image} alt="" />
                    <div className={styles.nameTime}>
                        <h4>{user?.fname} {user?.lname}</h4>
                        <span>{time}</span>
                    </div>
                </div>
                <div className={styles.WhoLiked}>
                    <img src={WhoLikeIcon} alt="" />
                    <p>{likedUsersNames?.at(-1)} {likedUsersNames.length > 1 ? `and ${likedUsersNames?.length - 1} other(s)` : ""}</p>
                </div>
                <div className={styles.reaction}>
                    <div className={styles.likedCount} onClick={() => {
                        dispatch(usersChange({ userid: photo.userid, logedid: logedUser.id, photoid: photo.id }))
                        if (likeAudioPaly.current) {
                            likeAudioPaly.current.play()
                        }
                    }}>
                        <img
                            src={!photo?.likes.includes(logedUser?.id) ? tLikeIcon : blueLikeIcon}
                        />
                        <p>Like</p>
                    </div>
                    <div className={styles.likedCount} onClick={() => setOpenSendBox(true)}>
                        <img src={tSendIcon} />
                        <p>Send</p>
                    </div>
                </div>
                {photo?.comments.map((el, index) => (
                    <Comments comm={el} key={index} />
                ))}
                <form onSubmit={onSub}>
                    <input type="text" placeholder="Comment..." />
                    <button><img src={SendIcon} alt="" /></button>
                </form>
            </div>
        </div>
    )
}