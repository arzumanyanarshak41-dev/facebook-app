import styles from "./userdropdownmenu.module.css"
// import { SVGIcon } from "./SVGIcon"
import { DropdownMenuPrimaryPage } from "../DropdownMenuPrimaryPage/DropdownMenuPrimaryPage"
import { useState } from "react"
import { DropdownSettingMenu } from "../DropdownSettingMenu/DropdownSettingMenu"
export const UserDropdownMenu = () => {

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
            <DropdownMenuPrimaryPage menusections={menusections} nextpage={nextpage} setnext={setnext} />
            <div className={styles.SecondaryPage} style={nextpage ? { transform: "translateX(calc(-100% - 16px))" } : {}}>
                {nextpage === "Settings" && <DropdownSettingMenu setnext={setnext} />}
                {nextpage === "support" && <div>support</div>}
                {nextpage === 'Display' && <div>Display</div>}
            </div>
        </div>
    )
}
