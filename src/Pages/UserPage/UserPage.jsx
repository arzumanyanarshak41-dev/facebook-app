import { Outlet, useLocation } from "react-router-dom"
import styles from "./UserPage.module.css"
import { UserPageMain } from "../../Components/UserPageMain/UserPageMain"
import { UserPageNav } from "../../Components/UserPageNav/UserPageNav"
import { useEffect } from "react"
import { logedUserAPI } from "../../Store/Slices/LogedUserSlice/LogedUserAPI"
import { usersFetch } from "../../Store/Slices/UserSlice/API"
import { useDispatch } from "react-redux"
export const UserPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [])
    useEffect(() => {
        window.scrollTo({ top: 310, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <div className={styles.UserPage}>
            <div className={styles.UserMainSection}>
                <div className={styles.container}>
                    <UserPageMain />
                </div>
            </div>

            <div className={styles.UserPageNavSection}>
                <div className={styles.container}>
                    <UserPageNav />
                </div>
            </div>

            <div className={styles.UserSecondPage}>
                <div className={styles.container}>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
