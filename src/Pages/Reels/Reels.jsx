import { useSelector } from 'react-redux';
import styles from './Reels.module.css'
import { selectUsers } from '../../Store/Slices/UserSlice/UserSlice';
import tLink from '../../Asets/reelTLike.png'
import tComm from '../../Asets/reelTComm.png'
import tShare from '../../Asets/reelTSend.png'
import { useEffect, useRef } from 'react';
export const Reels = () => {
    const users = useSelector(selectUsers)
    const allowedExtensions = [".mp4", ".webm", ".ogg"];
    function isAllowedVideo(url) {
        return allowedExtensions.some(ext => url.toLowerCase().endsWith(ext));
    }
    const allReels = users.reduce((acc, user) => {
        user.shorts.forEach(short => {
            acc.push({
                ...short,
                userName: `${user.fname} ${user.lname}`,
                userImage: user.profile_image,
                userId: user.id
            });
        });
        return acc;
    }, []);
    const sortedReels = allReels.sort((a, b) => {
        const timeA = new Date(a.uploaded_at).getTime();
        const timeB = new Date(b.uploaded_at).getTime();
        return timeB - timeA;
    });

    return (
        <div className={styles.backgroundReels}>
            <div className={styles.reels}>
                {sortedReels.map(reel => (
                    reel.url && (
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
                                <img src={tComm} alt="" />
                                <img src={tLink} alt="" />
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}