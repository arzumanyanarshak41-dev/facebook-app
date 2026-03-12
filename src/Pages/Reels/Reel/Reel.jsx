import styles from './Reel.module.css'
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, setUsers } from "../../../Store/Slices/UserSlice/UserSlice";
import { useState } from "react";
import tLink from '../../../Asets/reelTLike.png'
import tComm from '../../../Asets/reelTComm.png'
import tShare from '../../../Asets/reelTSend.png'
import SendIcon from '../../../Asets/sendIcon.png'
import blueLike from '../../../Asets/blue-like-button-icon.webp'
import { logedUserSelect } from "../../../Store/Slices/LogedUserSlice/LogedUserSlice";
import axios from "axios";
import { Comments } from '../../../Components/Comments/Comments';
import { Icon } from '../../../SVG/Icon';

export const Reel = ({ reel }) => {
    const users = useSelector(selectUsers)
    const logedUser = useSelector(logedUserSelect)
    const [commentText, setCommentText] = useState("");
    const [openComm, setOpenComm] = useState(false);
    const dispatch = useDispatch()

    const submitComment = async (e, reel) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        const user = users.find(u => u.id === reel.userId);

        const updatedShorts = user.shorts.map(short => {
            if (short.id === reel.id) {
                return {
                    ...short,
                    comments: [
                        ...short.comments,
                        {
                            sender: logedUser.id, 
                            text: commentText,
                            time: new Date().toISOString() 
                        }
                    ]
                };
            }
            return short;
        });

        await axios.patch(`http://localhost:3010/users/${user.id}`, {
            shorts: updatedShorts
        });

        const updatedUsers = users.map(u =>
            u.id === user.id ? { ...u, shorts: updatedShorts } : u
        );

        dispatch(setUsers(updatedUsers));
        setCommentText("");
    }
    const likeReel = async (reel) => {

        const user = users.find(u => u.id === reel.userId)

        const updatedShorts = user.shorts.map(short => {

            if (short.id === reel.id) {

                const isLiked = short.likes.includes(logedUser.id)

                return {
                    ...short,
                    likes: isLiked
                        ? short.likes.filter(id => id !== logedUser.id)
                        : [...short.likes, logedUser.id]
                }
            }

            return short
        })
        await axios.patch(`http://localhost:3010/users/${user.id}`, {
            shorts: updatedShorts
        })

        const updatedUsers = users.map(u =>
            u.id === user.id
                ? { ...u, shorts: updatedShorts }
                : u
        )

        dispatch(setUsers(updatedUsers))
    }
    return (
        <div key={reel.id} className={styles.reelbox}>
            <div className={styles.videoBox}>
                <video
                    src={reel.url}
                    autoPlay={false}
                    onClick={(e) => {
                        if (e.target.paused) {
                            e.target.play();
                        } else {
                            e.target.pause();
                        }
                    }}
                ></video>
                <div className={styles.nameinfo}>
                    <img src={reel.userImage} alt="" />
                    <p>{reel.userName}</p>
                </div>
            </div>
            <div className={styles.reaction}>
                <img src={tShare} alt="" />
                <img src={tComm} alt="" onClick={() => setOpenComm(!openComm)} />
                <img
                    src={reel.likes.includes(logedUser.id) ? blueLike : tLink}
                    alt=""
                    onClick={() => likeReel(reel)}
                />
            </div>
            {openComm ? <div className={styles.comments}>
                <span onClick={() => setOpenComm(false)}><Icon name={"xIcon"} size={"25px"} /></span>
                {reel.comments.map((el, index) => (
                    <Comments comm={el} key={index} />
                ))}
                <form onSubmit={(e) => submitComment(e, reel)}>
                    <input
                        type="text"
                        placeholder="Comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit"><img src={SendIcon} alt="" /></button>
                </form>
            </div> : <></>}
        </div>
    )
}