import styles from "./Publication.module.css"
import tLikeIcon from "../../Asets/tLike.png"
import tCommIcon from '../../Asets/tComm.png'
import tSendIcon from '../../Asets/tSend.png'
import blueLikeIcon from '../../Asets/blue-like-button-icon.webp'
import SendIcon from '../../Asets/sendIcon.png'
import commentSendAudio from '../../Asets/commentSendAudio.mp3'
import likeAudio from '../../Asets/likeing.mp3'
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { usersChange } from "../../Store/Slices/UserSlice/UsersChange"
import { Comments } from "../Comments/Comments"
import { addComment } from "../../Store/Slices/UserSlice/AddComment"
import { openMess } from "../../Store/Slices/messengerOpenSlicer/messengerOpenSlicer"
export const Publication = ({ photo }) => {
    const dispatch = useDispatch()
    const logedId = localStorage.getItem("ID")
    const [openComm, setOpenComm] = useState(false)
    const audioPlay = useRef(null)
    const likeAudioPaly = useRef(null)
    const getTime = (uploadedAt) => {
        const when = new Date() - new Date(uploadedAt);
        const whenSec = Math.floor(when / 1000);
        const whenMin = Math.floor(whenSec / 60);
        const whenH = Math.floor(whenMin / 60);
        const whenD = Math.floor(whenH / 24);

        if (whenSec < 60) return `${whenSec} sec ago`;
        if (whenH < 60) return `${whenMin} min ago`;
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
                <img src={photo.url} alt="" />
            </div>
            <div className={styles.reaction}>
                <img
                    src={!photo.likes.includes(logedId) ? tLikeIcon : blueLikeIcon}
                    onClick={() => {
                        dispatch(usersChange({ userid: photo.userid, logedid: logedId, photoid: photo.id }))
                        if (likeAudioPaly.current) {
                            likeAudioPaly.current.play()
                        }
                    }}
                />
                <img src={tCommIcon} onClick={() => setOpenComm(!openComm)} />
                <img src={tSendIcon} onClick={() => dispatch(openMess())} />
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