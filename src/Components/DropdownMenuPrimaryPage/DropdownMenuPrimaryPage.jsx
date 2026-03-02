import styles from "./dropdownmenuprimarypage.module.css"
import { SVGIcon } from "../UserDropdownMenu/SVGIcon"
import userlogo from "../GeneralMenu/GeneralMenu/Images/Icon/instagram.png"
import { useSelector } from "react-redux"
import { logedUserSelect } from "../../Store/Slices/LogedUserSlice/LogedUserSlice"

export const DropdownMenuPrimaryPage = ({ menusections, nextpage, setnext }) => {
    const logedUser = useSelector(logedUserSelect)
    return (
        <div
            className={`${styles.DropdownMenuPrimaryPage} ${nextpage ? styles.DropdownMenuPrimaryPageHiden : ""}`}

        >
            <div className={styles.UserChange}>
                <div className={styles.username}>
                    <img src={logedUser.profile_image} alt="userimg" />
                    <span>{logedUser.fname} {logedUser.lname}</span>
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
                        <div className={styles.SectionsItem} key={index} onClick={() => setnext(item.NextPages)}>

                            <div className={styles.iconholder}>
                                <SVGIcon name={item.IconName} />
                            </div>

                            <span>{item.name}</span>
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
