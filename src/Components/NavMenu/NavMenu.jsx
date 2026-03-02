import { NavLink } from 'react-router-dom'
import styles from './NavMenu.module.css'
import { Icon } from '../../SVG/Icon'
import facebookIcon from '../../Asets/Facebook_f_logo_(2021).svg.png'
import { SearchGeneral } from '../SearchGeneral/SearchGeneral'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openMess } from '../../Store/Slices/messengerOpenSlicer/messengerOpenSlicer'
import { GeneralMenu } from '../GeneralMenu/GeneralMenu/GeneralMenu'
import { UserDropdownMenu } from '../UserDropdownMenu/UserDropdownMenu'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'

export const NavMenu = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    const [generalMenuOpen, setgeneralMenuOpen] = useState(false)
    const [userDropdownMenuOpen, setuserDropdownMenuOpen] = useState(false)
    const logedUser = useSelector(logedUserSelect)
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
                        userDropdownMenuOpen && <UserDropdownMenu />
                    }
                </div>
                <div className={styles.links}>
                    <NavLink to={'/home'} end title='home'>
                        {({ isActive }) => (
                            <Icon
                                name={"Home"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/reels'} title='reels'>
                        {({ isActive }) => (
                            <Icon
                                name={"Reels"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/marketplace'} title='marketplace'>
                        {({ isActive }) => (
                            <Icon
                                name={"Marketplace"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/friends'} title='friends'>
                        {({ isActive }) => (
                            <Icon
                                name={"NavFriends"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/games'} title='games'>
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
                    <button onClick={() => dispatch(openMess())}><Icon name={"Messenger"} coloricon='black' size={"25px"} /></button>
                    <button><Icon name={"Notifications"} coloricon='black' size={"25px"} /></button>
                    <img src={logedUser.profile_image} alt="" onClick={() => { setuserDropdownMenuOpen(!userDropdownMenuOpen); setgeneralMenuOpen(null); }} />
                </div>
            </nav>
            <div className={styles.linksbottom}>
                <NavLink to={'/home'} end title='home'>
                        {({ isActive }) => (
                            <Icon
                                name={"Home"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/reels'} title='reels'>
                        {({ isActive }) => (
                            <Icon
                                name={"Reels"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/marketplace'} title='marketplace'>
                        {({ isActive }) => (
                            <Icon
                                name={"Marketplace"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/friends'} title='friends'>
                        {({ isActive }) => (
                            <Icon
                                name={"NavFriends"}
                                size={"25px"}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                    <NavLink to={'/home/games'} title='games'>
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