import styles from "./AllPersonalDetails.module.css"
import { GoPencil } from "react-icons/go";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsGenderAmbiguous } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export const AllPersonalDetails = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.allPersonalDetails}>
            <span className={styles.Title}>
                Personal details
                <GoPencil size={20} color="grey" strokeWidth={0.5} onClick={()=>{navigate("/home")}}/>
            </span>
            <div className={styles.PersonalDetailsBody}>
                <div className={styles.BirthDay}>
                    <LiaBirthdayCakeSolid size={24} color="#181c19" strokeWidth={0.4} />
                    <span>March 24, 2004</span>
                </div>
                <div className={styles.gender}>
                    <BsGenderAmbiguous size={24} color="#181c19" strokeWidth={0.2}/>
                    <span>Male</span>
                </div>
            </div>
        </div>
    )
}
