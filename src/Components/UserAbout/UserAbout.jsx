import styles from "./userAbout.module.css"
import { RiArrowDownSLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { IoIosCamera } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPhoto, logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice";
import { logedUserAPI } from "../../Store/Slices/LogedUserSlice/LogedUserAPI";
import { useEffect, useRef } from "react";
import { changeProfileImage } from "../../Store/Slices/UserSlice/ChangeProfileImage";

export const UserAbout = ({PeopleKnow,setPeopleKnow}) => {

  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    dispatch(logedUserAPI());
  }, [dispatch]);
  
  const logedUser = useSelector(logedUserSelect)
  
  
  const chooseProfilePhoto = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      dispatch(changeProfileImage({ userId: logedUser?.id, base64Image: base64String }));
      dispatch(changeUserPhoto(base64String))
    };
    reader.readAsDataURL(file);
    
  };

  return (
    <div className={styles.UserAbout}>
      <div className={styles.profilPhotoNameHolder}>
        <div className={styles.profilPhoto} style={{ backgroundImage: `url(${logedUser?.profile_image})` }}>
          <div className={styles.chooseProfilPhoto} onClick={() => chooseProfilePhoto()} >
            <IoIosCamera size={30} />
          </div>
        </div>

        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        <div className={styles.userNameFriendsCount}>
          <span className={styles.userName}>
            <span>{logedUser.fname}</span>
            <span>{logedUser.lname}</span>

          </span>
          <span className={styles.FriendsCount}>
            {logedUser.friends?.length} friends
          </span>
        </div>
      </div>

      <div className={styles.buttonsHolder}>
        <button className={styles.addStory}>  <FaPlus color="#fff" size={16} />Add to story</button>
        <button className={styles.editProfile}> <FaPen size={16} />Edit profile</button>
        <button className={styles.showPeople} onClick={() => setPeopleKnow(!PeopleKnow)}>
          <RiArrowDownSLine size={22} />
        </button>
      </div>

    </div>
  )
}
