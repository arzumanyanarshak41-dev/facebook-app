import { useMemo, useState } from 'react'
import { Icon } from '../../SVG/Icon'
import styles from './SearchGeneral.module.css'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../Store/Slices/UserSlice/UserSlice'

export const SearchGeneral = ({ setOpen }) => {
    const users = useSelector(selectUsers)
    const [search, setSearch] = useState("")
    const filtered = useMemo(() => {
        if (search.trim() == "") return [];
        return users.filter(el => el.fname.startsWith(search) || el.lname.startsWith(search) || el.usname.startsWith(search))
    }, [search])
    return (
        <div className={styles.searchGeneral}>
            <div className={styles.top}>
                <div onClick={() => setOpen(false)}><Icon name={"LeftArrow"} size={"30px"} /></div>
                <input type="search" placeholder='Search in Facebook' name='search' onChange={(e) => { setSearch(e.target.value.trim()) }} />
            </div>
            <div className={styles.searchResult}>
                <div className={styles.userBox}>
                    {
                        filtered.map(user => {
                            return (
                                <div className={styles.userShowBox}>
                                    <img src={user.profile_image} alt="" />
                                    <div className={styles.userInfo}>
                                        <h4>{user.fname} {user.lname}</h4>
                                        <p>{user.usname}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}