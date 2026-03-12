import styles from "./dropdownmenuprimarypage.module.css"
import { SVGIcon } from "../UserDropdownMenu/SVGIcon"
import { useSelector } from "react-redux"
import { logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const DropdownMenuPrimaryPage = ({ menusections, nextpage, setnext, setuserDropdownMenuOpen }) => {
    const loginUser = useSelector(logedUserSelect)
    const navigate = useNavigate()
    return (
        <div
            className={`${styles.DropdownMenuPrimaryPage} ${nextpage ? styles.DropdownMenuPrimaryPageHiden : ""}`}

        >
            <div className={styles.UserChange}>
                <div className={styles.username} onClick={() => { navigate(`/home/userpage/${loginUser.id}`); setuserDropdownMenuOpen(false) }}>
                    <img src={loginUser.profile_image} alt="userimg" />
                    <span>
                        <span>{loginUser.fname}</span>
                        <span>{loginUser.lname}</span>
                    </span>
                </div>
                <hr />
                <button>
                    <SVGIcon name={"SwitchUser"} size={16} />
                    See all profiles
                </button>
            </div>

            <div className={styles.MenuSections}>
                {menusections.map((item, index) => {
                    return (
                        <div className={styles.SectionsItem} key={index} onClick={async () => {
                            setnext(item.NextPages)

                            if (item.IconName === "Logout") {
                                localStorage.clear()
                                await axios.patch(`http://localhost:3010/users/${loginUser.id}`, {
                                    lastSeen: new Date().toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })
                                })
                                navigate("/")
                            }
                        }}>

                            <div className={styles.iconholder}>
                                <SVGIcon name={item.IconName} />
                            </div>

                            <span onClick={() => {

                            }}>{item.name}</span>
                            {item.NextPages && <SVGIcon name={"RightArrow"} color={"#525252"} />}
                        </div>
                    )
                })}
            </div>

            <footer>
                <p>Privacy · Terms · Advertising · Ad Choices · Cookies · More</p>
            </footer>
        </div >
    )
}
