import styles from './GeneralRightSide.module.css'
import messengerPNG from '../../Components/GeneralMenu/GeneralMenu/Images/Icon/facebook-messenger-logo-png-transparent.png'
import friendsPNG from '../../Components/GeneralMenu/GeneralMenu/Images/Icon/friend.png'
import GamesPNG from '../../Components/GeneralMenu/GeneralMenu/Images/Icon/gaming.png'
import marketplacePNG from '../../Components/GeneralMenu/GeneralMenu/Images/Icon/shop.png'
import reelsPNG from "../../Components/GeneralMenu/GeneralMenu/Images/Icon/reel.png"
import GroupPNG from "../../Components/GeneralMenu/GeneralMenu/Images/Icon/groups.png"
import fireWather from '../../Asets/fireWather.png'
import linesPNG from '../../Asets/ColorLink.png'
import electroPNG from '../../Asets/ElectricMan.png'
import cascadechaosPNG from '../../Asets/square-gamethumb-1-cascadechaos.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logedUserSelect } from '../../Store/Slices/LogedUserSlice/LogedUserSlice'
export const GeneralRightSide = () => {
    const navigate = useNavigate()
    const logedUser = useSelector(logedUserSelect)
    const menuItems = [
        {
            title: "Friends",
            link: "/friends",
            image: friendsPNG
        },
        {
            title: "AddFrends",
            link: "/addFriends",
            image: GroupPNG
        },
        {
            title: "Games",
            link: "/home/games",
            image: GamesPNG
        },
        {
            title: "Messneger",
            link: "/home/messenger",
            image: messengerPNG
        },
        {
            title: "Marketplace",
            link: "/home/marketplace",
            image: marketplacePNG
        },
        {
            title: "Reels",
            link: "/reels",
            image: reelsPNG
        }
    ];
    const games = [
        {
            title: "FireBoy and WatherGirl",
            link: "https://www.friv.com/z/games/fireboyandwatergirlforest/game.html",
            image: fireWather
        },
        {
            title: "ElectroMan",
            link: "https://www.friv.com/z/games/electricman/game.html",
            image: electroPNG
        },
        {
            title: "Color Line",
            link: "https://www.friv.com/z/games/colorlink/game.html",
            image: linesPNG
        },
        {
            title: "Cascade Chaos",
            link: "https://www.friv.com/z/games/cascadechaos/game.html",
            image: cascadechaosPNG
        }
    ]
    return (
        <ul className={styles.generalRightSide}>
            <li className={styles.sidebarItem} onClick={()=>navigate("userpage")}>
                <img src={logedUser.profile_image} />
                <span>{logedUser.fname} {logedUser.lname}</span>
            </li>
            {menuItems.map((item, index) => (
                <Link to={item.link} key={index}>
                    <li key={index} className={styles.sidebarItem}>
                        <img src={item.image} alt={item.title} />
                        <span>{item.title}</span>
                    </li>
                </Link>
            ))}
            <div className={styles.gamesBox}>
                <h4>Games</h4>
                <p>The games will launch on the Friv platform</p>
                {
                    games.map((item, index) => (
                        <a href={item.link} target='_black' key={index}>
                            <li key={index} className={styles.sidebarItem} >
                                <img src={item.image} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        </a>
                    ))
                }
            </div>
        </ul>
    )
}