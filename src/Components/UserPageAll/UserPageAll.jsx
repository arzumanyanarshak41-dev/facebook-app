
import { useSelector } from "react-redux"
import { AddPost } from "../AddPost/AddPost"
import { AllPersonalDetails } from "../AllPersonalDetals/AllPersonalDetails"
import styles from "./userPageAll.module.css"
import { logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice"
import { Publication } from "../Publication/Publication"

export const UserPageAll = () => {
    const logedUser = useSelector(logedUserSelect)
    return (
        <div className={styles.UserPageAll}>
            <div className={styles.LeftPart}>
                <AllPersonalDetails />
            </div>
            <div className={styles.RightPart}>
                <AddPost />
                {
                    logedUser?.photos?.toSorted((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at))
                        .map(el => {
                            return (
                                <Publication photo={{ ...el, fname: logedUser.fname, lname: logedUser.lname, profile_image: logedUser.profile_image }} />
                            )
                        })
                }
            </div>
        </div>
    )
}
