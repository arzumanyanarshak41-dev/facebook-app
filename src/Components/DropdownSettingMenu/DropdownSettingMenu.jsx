import { SVGIcon } from "../UserDropdownMenu/SVGIcon"
import styles from "./dropdownsettingmenu.module.css"
export const DropdownSettingMenu = ({ setnext }) => {

    const SettingSectons = [
        {
            "IconName": "Settings",
            "name": "Settings"
        },
        {
            "IconName": "Privacyandcheckup",
            "name": "Privacy checkup"
        },
        {
            "IconName": "Privacy",
            "name": "Privacy Center"
        },
        {
            "IconName": "Activity",
            "name": "Activity log"
        },
        {
            "IconName": "Content",
            "name": "Content preferences"
        }

    ]


    return (
        <div className={styles.SettingPart}>
            <div className={styles.Title}>
                <div className={styles.IconHolder} onClick={() => setnext(null)}>
                    <SVGIcon name={"ArrowLeft"} size={25} />
                </div>
                <span>Settings & privacy</span>
            </div>

            <div className={styles.SettingMenuSectons}>
                {SettingSectons.map((item, index) => {
                    return (
                        <div key={index} className={styles.SectionsItem} >
                            <div className={styles.iconholder}>
                                <SVGIcon name={item.IconName} />
                            </div>
                            <span>{item.name}</span>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}
