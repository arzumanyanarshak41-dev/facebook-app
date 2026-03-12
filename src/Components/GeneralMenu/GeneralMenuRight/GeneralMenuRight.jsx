import { SvgIcon } from "../GeneralMenu/SvgIcon";
import styles from "../GeneralMenu/generalmenu.module.css"

export const GeneralMenuRight = ({ createItems }) => {
    return (
        <div className={styles.MenuRightBox}>
            <h3>Create</h3>

            {createItems.map((item, index) => (
                <div key={index}>
                    <div className={styles.MenuRightBoxRow}>
                        <div className={styles.IconHolder}>
                            <SvgIcon name={item.icon} size={20} />
                        </div>
                        <p>{item.label}</p>
                    </div>

                    {index === 3 && <hr />}
                </div>
            ))}
        </div>
    );
};