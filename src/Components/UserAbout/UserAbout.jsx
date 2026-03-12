import styles from "./userAbout.module.css"
import { RiArrowDownSLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { IoIosCamera } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPhoto } from "../../Store/Slices/LogedUserSlice/LogedUserSlice";
import { logedUserAPI } from "../../Store/Slices/LogedUserSlice/LogedUserAPI";
import { useEffect, useRef, useState } from "react";
import { changeProfileImage } from "../../Store/Slices/UserSlice/ChangeProfileImage";
import { useParams } from "react-router-dom";
import { selectUsers } from "../../Store/Slices/UserSlice/UserSlice";
import axios from "axios";

export const UserAbout = ({ PeopleKnow, setPeopleKnow }) => {

  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const { id } = useParams()
  const users = useSelector(selectUsers)
  const logedUser = users.find(el => el.id == id)
  const LocalID = localStorage.getItem("ID")

  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    dispatch(logedUserAPI());
    if (logedUser?.notifications?.some(n => n.userid === LocalID && n.status === "friend")) {
      setRequestSent(true);
    }
  }, [dispatch, logedUser, LocalID]);

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

  const toggleFriendRequest = async (id) => {
    const friend = users?.find(u => u.id === id);
    if (!friend) return;

    if (!requestSent) {
      const newNot = {
        id: new Date().toString(),
        userid: LocalID,
        status: "friend",
        linkId: id,
        time: new Date().toISOString()
      };

      await axios.patch(`http://localhost:3010/users/${id}`, {
        notifications: [...(friend.notifications || []), newNot]
      });

      setRequestSent(true);
    } else {
      const updatedNotifications = (friend.notifications || []).filter(
        n => !(n.userid === LocalID && n.status === "friend")
      );

      await axios.patch(`http://localhost:3010/users/${id}`, {
        notifications: updatedNotifications
      });

      setRequestSent(false);
    }
  };

  if (!logedUser) return <div>Loading...</div>;

  return (
    <div className={styles.UserAbout}>
      <div className={styles.profilPhotoNameHolder}>
        <div className={styles.profilPhoto} style={{ backgroundImage: `url(${logedUser?.profile_image})` }}>
          {LocalID == logedUser.id && (
            <div className={styles.chooseProfilPhoto} onClick={chooseProfilePhoto}>
              <IoIosCamera size={30} />
            </div>
          )}
        </div>

        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        <div className={styles.userNameFriendsCount}>
          <span className={styles.userName}>
            <span>{logedUser?.fname}</span>
            <span>{logedUser?.lname}</span>
          </span>
          <span className={styles.FriendsCount}>
            {logedUser?.friends?.length} friends
          </span>
        </div>
      </div>

      <div className={styles.buttonsHolder}>
        {LocalID == logedUser.id ? (
          <button className={styles.editProfile}>
            <FaPen size={16} /> Edit profile
          </button>
        ) : (
          <button
            onClick={() => toggleFriendRequest(logedUser?.id)}
            style={{
              backgroundColor: requestSent ? "#00aaff" : "#fff",
              color: requestSent ? "#fff" : "#000",
              border: "1px solid #00aaff",
              cursor: "pointer",
            }}
          >
            {requestSent ? "Request Sent" : "+ Add to Friends"}
          </button>
        )}
        <button className={styles.showPeople} onClick={() => setPeopleKnow(!PeopleKnow)}>
          <RiArrowDownSLine size={22} />
        </button>
      </div>
    </div>
  );
};