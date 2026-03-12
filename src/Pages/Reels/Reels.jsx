import { useDispatch, useSelector } from 'react-redux';
import styles from './Reels.module.css'
import { selectUsers, setUsers } from '../../Store/Slices/UserSlice/UserSlice';
import { Reel } from './Reel/Reel';
import { useEffect } from 'react';
import { logedUserAPI } from '../../Store/Slices/LogedUserSlice/LogedUserAPI';
import { usersFetch } from '../../Store/Slices/UserSlice/API';
export const Reels = () => {
    const users = useSelector(selectUsers)
    const dispatch = useDispatch()
    const allowedExtensions = ".mp4";
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
    const sortedReels = allReels.toSorted((a, b) => {
        const timeA = new Date(a.uploaded_at).getTime();
        const timeB = new Date(b.uploaded_at).getTime();
        return timeB - timeA;
    });
    useEffect(() => {
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [])

    return (
        <div className={styles.backgroundReels}>
            <div className={styles.reels}>
                {sortedReels.map(reel => (
                    reel.url && (
                        <Reel reel={reel} />
                    )
                ))}
            </div>
        </div>
    );
}