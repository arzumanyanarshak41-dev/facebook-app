import { SVGIcon } from "../UserDropdownMenu/SVGIcon"
import styles from "./dropdownmenusecondarypage.module.css"


export const DropdownMenuSecondaryPage = ({ nextpage, setnext }) => {
    const SecondaryPageData = {
        Settings: {
            title: "Settings & privacy",
            sections: [
                { IconName: "Settings", name: "Settings" },
                { IconName: "Privacyandcheckup", name: "Privacy checkup" },
                { IconName: "Privacy", name: "Privacy Center" },
                { IconName: "Activity", name: "Activity log" },
                { IconName: "Content", name: "Content preferences" }
            ]
        },
        support: {
            title: "Help & support",
            sections: [
                { IconName: "Help", name: "Help Center" },
                { IconName: "AccountStatus", name: "Account Status" },
                { IconName: "Message", name: "Support Inbox" },
                { IconName: "ReportProblem", name: "Report a problem" }
            ]
        },
        Display: {
            title: "Display & accessibility",
            sections: [
                { IconName: "Moon", name: "Dark Mode" },
            ]
        }
    }

    const { sections: currentSections = [], title } = SecondaryPageData[nextpage] || {}

    return (
        <div className={`${styles.SecondaryPage} ${nextpage ? styles.SecondaryPageActive : ""}`}>

            <div className={styles.Title}>
                <div className={styles.IconHolder} onClick={() => setnext(null)}>
                    <SVGIcon name="ArrowLeft" size={25} />
                </div>
                <span>{title}</span>
            </div>

            {nextpage === "Display" ? (
                <div className={styles.SecondarySections}>
                    {currentSections.map((item) => (
                        <div key={item.name} className={styles.DarkModeSection}>
                            <div className={`${styles.iconholder}  ${styles.DarkModeIcon}`}>
                                <SVGIcon name={item.IconName} />
                            </div>
                            <div className={styles.changeModeBox}>
                                <span>{item.name}</span>
                                <p>Adjust the appearance of Facebook to reduce glare and give your eyes a break</p>
                                <form className={styles.radioGroup}>
                                    <label className={`${styles.SectionsItem} ${styles.DarkMoodItem}`}>
                                        <span>On</span>
                                        <input type="radio" name="mode" value="on" className={styles.inputRadio} />
                                    </label>

                                    <label className={`${styles.SectionsItem} ${styles.DarkMoodItem}`}>
                                        <span>Off</span>
                                        <input type="radio" name="mode" value="off" defaultChecked className={styles.inputRadio} />
                                    </label>

                                    <label className={`${styles.SectionsItem} ${styles.DarkMoodItem}`}>
                                        <span>Automatic</span>
                                        <input type="radio" name="mode" value="auto" className={styles.inputRadio} />
                                    </label>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (

                <div className={styles.SecondarySections}>
                    {currentSections.map((item) => (
                        <div key={item.name} className={styles.SectionsItem}>
                            <div className={styles.iconholder}>
                                <SVGIcon name={item.IconName} />
                            </div>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}