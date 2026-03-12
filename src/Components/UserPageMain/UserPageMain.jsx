import { useDispatch, useSelector } from "react-redux";
import { PeopleYouMayKnow } from "../PeopleYouMeyNow/PeopleYouMayKnow";
import { UserAbout } from "../UserAbout/UserAbout";
import styles from "./userPageMain.module.css"
import { useRef, useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { changeUserCoverPhoto, logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice";
import { ChangeProfileCoverPhoto } from "../../Store/Slices/UserSlice/ChangeProfileCoverPhoto";
import { useParams } from "react-router-dom";
import { selectUsers } from "../../Store/Slices/UserSlice/UserSlice";
export const UserPageMain = () => {
  const fileRef = useRef("");
  const dispatch = useDispatch()
  const { id } = useParams()
  const users = useSelector(selectUsers)
  const logedUser = users.find(el => el.id == id)
  const chooseCoverPhoto = () => {
    fileRef.current.click();
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    dispatch(ChangeProfileCoverPhoto({
      userId: logedUser?.id,
      coverPhoto: imageUrl
    }));

    dispatch(changeUserCoverPhoto(imageUrl));
  };


  const [PeopleKnow, setPeopleKnow] = useState(false)


  return (

    <div className={styles.UserPageMain}>
      <div className={styles.coverPhoto} onClick={chooseCoverPhoto} style={{ backgroundImage: `url(${logedUser?.Cover_Photo})` }}>
        <div className={styles.coverPhotoBottom} onClick={(e) => e.stopPropagation()} >
          <label className={styles.addCoverPhoto} onClick={chooseCoverPhoto}>
            <IoIosCamera size={24} />
            {logedUser?.Cover_Photo ? <span>Edit cover photo</span> : <span>Add cover photo</span>}
          </label>
        </div>

        <input type="file" ref={fileRef} hidden onChange={(e) => { handleCoverPhotoChange(e) }} />
      </div>

      <UserAbout PeopleKnow={PeopleKnow} setPeopleKnow={setPeopleKnow} />
      {PeopleKnow && <PeopleYouMayKnow />}

    </div>

  )
}
