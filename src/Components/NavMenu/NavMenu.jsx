import { NavLink, useNavigate } from 'react-router-dom'
import styles from './NavMenu.module.css'
import { Icon } from '../../SVG/Icon'
import facebookIcon from '../../Asets/Facebook_f_logo_(2021).svg.png'
import { SearchGeneral } from '../SearchGeneral/SearchGeneral'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openMess } from '../../Store/Slices/messengerOpenSlicer/messengerOpenSlicer'
import { GeneralMenu } from '../GeneralMenu/GeneralMenu/GeneralMenu'
import { UserDropdownMenu } from '../UserDropdownMenu/UserDropdownMenu'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
import { Notifications } from '../Notifications/Notifications'
import { isAction } from '@reduxjs/toolkit'

export const NavMenu = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    const [generalMenuOpen, setgeneralMenuOpen] = useState(false)
    const [userDropdownMenuOpen, setuserDropdownMenuOpen] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const logedUser = useSelector(logedUserSelect)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className={styles.navmenu}>
            <nav>
                <div className={styles.serachBox}>
                    <img src={facebookIcon} alt="" />
                    <button className={styles.searchbutton} onClick={() => setSearchOpen(!searchOpen)}><Icon name={"Search"} size={"30px"} /></button>
                    {
                        searchOpen && <SearchGeneral setOpen={setSearchOpen} />
                    }
                    {
                        generalMenuOpen && <GeneralMenu />
                    }
                    {
                        userDropdownMenuOpen && <UserDropdownMenu setuserDropdownMenuOpen={setuserDropdownMenuOpen} />
                    }
                    {
                        notificationsOpen && <Notifications setNotificationsOpen={setNotificationsOpen} />
                    }
                </div>
                <div className={styles.links}>
                    <NavLink to={'/home'} end title='home' className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <Icon
                                name={"Home"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/reels'} title='reels' className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <Icon
                                name={"Reels"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/marketplace'} title='marketplace' className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <Icon
                                name={"Marketplace"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/friends'} title='Add Friends' className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <Icon
                                name={"NavFriends"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/games'} title='games' className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <Icon
                                name={"Games"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                </div>
                <div className={styles.buts}>
                    <button onClick={() => { setuserDropdownMenuOpen(null); setgeneralMenuOpen(!generalMenuOpen); }}><Icon name={"Menu"} coloricon='black' size={"20px"} /></button>
                    <button onClick={() => window.innerWidth < 1025 || (!window.location.href.endsWith("home") && !window.location.href.endsWith("home/")) ? navigate('/home/messenger') : dispatch(openMess())}><Icon name={"Messenger"} coloricon='black' size={"25px"} />
                        {logedUser.messages?.some(m => m.seen == true) && <span className={styles.circle}></span>}
                    </button>
                    <button onClick={() => setNotificationsOpen
                        (!notificationsOpen)
                    }><Icon name={"Notifications"} coloricon='black' size={"25px"} /></button>
                    <img src={logedUser.profile_image} alt="" onClick={() => { setuserDropdownMenuOpen(!userDropdownMenuOpen); setgeneralMenuOpen(null); }} />
                </div>
            </nav>
            <div className={styles.linksbottom}>
                <NavLink to={'/home'} end title='home' className={({ isActive }) => (isActive ? styles.active : '')}>
                    {({ isActive }) => (
                        <Icon
                            name={"Home"}
                            size={"25px"}
                            active={isActive}
                        />
                    )}
                </NavLink>
                <NavLink to={'/home/reels'} title='reels' className={({ isActive }) => (isActive ? styles.active : '')}>
                    {({ isActive }) => (
                        <Icon
                            name={"Reels"}
                            size={"25px"}
                            active={isActive}
                        />
                    )}
                </NavLink>
                <NavLink to={'/home/marketplace'} title='marketplace' className={({ isActive }) => (isActive ? styles.active : '')}>
                    {({ isActive }) => (
                        <Icon
                            name={"Marketplace"}
                            size={"25px"}
                            active={isActive}
                        />
                    )}
                </NavLink>
                <NavLink to={'/home/friends'} title='friends' className={({ isActive }) => (isActive ? styles.active : '')}>
                    {({ isActive }) => (
                        <Icon
                            name={"NavFriends"}
                            size={"25px"}
                            active={isActive}
                        />
                    )}
                </NavLink>
                <NavLink to={'/home/games'} title='games' className={({ isActive }) => (isActive ? styles.active : '')}>
                    {({ isActive }) => (
                        <Icon
                            name={"Games"}
                            size={"25px"}
                            active={isActive}
                        />
                    )}
                </NavLink>
            </div>
        </div>
    )
}