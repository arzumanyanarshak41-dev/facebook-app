import { NavLink, useLocation, useNavigate } from "react-router-dom"
import styles from "./userPageNav.module.css"

export const UserPageNav = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <div className={styles.UserPageNav}>
            <NavLink to="" end className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}            >
                <div className={styles.innerLink}>
                    All
                </div>
            </NavLink>
            <NavLink to="about" end className={`${location.pathname.includes("/about") ? styles.activeLink : styles.link}`}                >
                <div className={styles.innerLink}>
                    About
                </div>
            </NavLink>
            <NavLink to="frends" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}                >
                <div className={styles.innerLink}>
                    Friends
                </div>
            </NavLink>
            <NavLink to="/home/reels" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}                >
                <div className={styles.innerLink} >
                    Reels
                </div>
            </NavLink>
        </div>
    )
}
