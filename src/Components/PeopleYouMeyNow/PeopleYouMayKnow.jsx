import { useSelector } from "react-redux"
import styles from "./peopleYouMayKnow.module.css"
import { logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice"
export const PeopleYouMayKnow = () => {

  const logedUser = useSelector(logedUserSelect)
  console.log(logedUser.friends);
  
  return (
    <div className={styles.peopleYouMayKnow}>
      <span className={styles.mayKnowTitle}>
        People You May Now
      </span>
      <div className={styles.mayKnowBody}>
      </div>
    </div>
  )
}
