import { Icon } from '../../SVG/Icon'
import styles from './SearchGeneral.module.css'

export const SearchGeneral = ({ setOpen }) => {
    return (
        <div className={styles.searchGeneral}>
            <div className={styles.top}>
                <div onClick={()=>setOpen(false)}><Icon name={"LeftArrow"} size={"30px"} /></div>
                <input type="search" placeholder='Search in Facebook' name='search' />
            </div>
            <div className={styles.searchResult}>
                <div className={styles.userBox}>
                    {/* <img src="" alt="" /> */}
                    <div className={styles.namebox}>
                        <h4>aaa</h4>
                        <p>bbb</p>
                    </div>
                    <Icon name={"xIcon"} size={"20px"} />
                </div>
            </div>
        </div>
    )
}