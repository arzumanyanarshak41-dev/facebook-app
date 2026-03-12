import axios from "axios"
import styles from "./Publication.module.css"
import tLikeIcon from "../../Asets/tLike.png"
import tCommIcon from '../../Asets/tComm.png'
import blueLikeIcon from '../../Asets/blue-like-button-icon.webp'
import SendIcon from '../../Asets/sendIcon.png'
import commentSendAudio from '../../Asets/commentSendAudio.mp3'
import likeAudio from '../../Asets/likeing.mp3'
import WhoLikeIcon from '../../Asets/LikeForShowHow.png'
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { usersChange } from "../../Store/Slices/UserSlice/UsersChange"
import { Comments } from "../Comments/Comments"
import { addComment } from "../../Store/Slices/UserSlice/AddComment"
import { useNavigate } from "react-router-dom"

export const Publication = ({ photo }) => {
    const dispatch = useDispatch()
    const logedId = localStorage.getItem("ID")
    const [openComm, setOpenComm] = useState(false)
    const audioPlay = useRef(null)
    const likeAudioPaly = useRef(null)
    const navigate = useNavigate()
    const [likedUsersNames, setLikedUsersNames] = useState([]);
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
    }
    useEffect(() => {
        showLikedUsers()
    }, [photo.likes])
    
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
    const time = getTime(photo.uploaded_at)
    function onSub(e) {
        e.preventDefault()
        if (audioPlay.current) {
            audioPlay.current.play()
        }
        const comment = e.target[0].value.trim()
        dispatch(addComment({ whoId: photo.userid, photoId: photo.id, newComment: { sender: logedId, text: comment, time: new Date().toISOString() } }))

        e.target.reset()
    }
    return (
        <div className={styles.publication}>
            <audio src={commentSendAudio} ref={audioPlay}></audio>
            <audio src={likeAudio} ref={likeAudioPaly}></audio>
            <div className={styles.userInfo}>
                <img src={photo.profile_image} alt="" />
                <div className={styles.nameinfo}>
                    <h4>{photo.fname} {photo.lname}</h4>
                    <p>{time}</p>
                </div>
            </div>
            <div className={styles.discription}>
                <p>{photo.description}</p>
            </div>
            <div className={styles.publicImage}>
                {
                    typeof photo.url == "object" ? <div className={styles.publicText} style={{ backgroundColor: `${photo?.url?.background}` }}>{photo?.url?.text}</div> :
                        <img src={photo.url} alt="" onClick={() => navigate(`/home/photo/${photo.id}`, { state: photo.id })} />
                }
            </div>
            <div className={styles.WhoLiked}>
                <img src={WhoLikeIcon} alt="" />
                <p>{likedUsersNames?.at(-1)} {likedUsersNames.length > 1 ? `and ${likedUsersNames?.length - 1} other(s)` : ""}</p>
            </div>
            <div className={styles.reaction}>
                <div className={styles.likedCount} onClick={() => {
                    dispatch(usersChange({ userid: photo.userid, logedid: logedId, photoid: photo.id }))
                    if (likeAudioPaly.current) {
                        likeAudioPaly.current.play()
                    }
                }}>
                    <img
                        src={!photo.likes.includes(logedId) ? tLikeIcon : blueLikeIcon}
                    />
                    <p>Like</p>
                </div>
                <div className={styles.likedCount} onClick={() => setOpenComm(!openComm)}>
                    <img src={tCommIcon} />
                    <p>Comments</p>
                </div>
            </div>
            {openComm ? <div className={styles.comments}>
                {photo.comments.map((el, index) => (
                    <Comments comm={el} key={index} />
                ))}
                <form onSubmit={onSub}>
                    <input type="text" placeholder="Comment..." />
                    <button><img src={SendIcon} alt="" /></button>
                </form>
            </div> : <></>}
        </div>
    )
}