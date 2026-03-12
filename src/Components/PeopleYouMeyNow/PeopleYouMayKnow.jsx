import { useSelector } from "react-redux"
import styles from "./peopleYouMayKnow.module.css"
import { logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice"
import { selectUsers } from "../../Store/Slices/UserSlice/UserSlice"
import { useParams } from "react-router-dom"
export const PeopleYouMayKnow = () => {

  const { id } = useParams()
  const users = useSelector(selectUsers)
  const logedUser = users.find(el => el.id == id)
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
