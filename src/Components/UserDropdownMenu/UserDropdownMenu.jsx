import styles from "./userdropdownmenu.module.css"
import { DropdownMenuPrimaryPage } from "../DropdownMenuPrimaryPage/DropdownMenuPrimaryPage"
import { useState } from "react"
import { DropdownMenuSecondaryPage } from "../DropdownMenuSecondaryPage/DropdownMenuSecondaryPage"
export const UserDropdownMenu = ({setuserDropdownMenuOpen}) => {

    const [nextpage, setnext] = useState(null)

    const menusections = [
        {
            "IconName": "Settings",
            "name": "Settings & privacy",
            "NextPages": "Settings"
        },
        {
            "IconName": "Help",
            "name": "Help & support",
            "NextPages": "support"
        },
        {
            "IconName": "Moon",
            "name": "Display & accessibility",
            "NextPages": "Display"
        },
        {
            "IconName": "Feedback",
            "name": "Give feedback",
            "NextPages": null
        },
        {
            "IconName": "Logout",
            "name": "Log out",
            "NextPages": null
        }
    ]

    return (
        <div className={styles.UserDropdownMenu}>
            <DropdownMenuPrimaryPage menusections={menusections} nextpage={nextpage} setnext={setnext} setuserDropdownMenuOpen={setuserDropdownMenuOpen} />
            <DropdownMenuSecondaryPage nextpage={nextpage} setnext={setnext} />
        </div>
    )
}
