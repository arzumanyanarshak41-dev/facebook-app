import { useEffect, useState } from "react"
import styles from "./GamesPage.module.css"
import axios from "axios"
import allPNG from "../../Asets/allGames.png"
import driveGamePng from '../../Asets/DrivingGame.png'
import actionPNG from '../../Asets/actionGames.png'
import adenturesPNG from '../../Asets/adventuresGames.png'
import desktopPNG from '../../Asets/DesktopGames.png'
import { useDispatch } from "react-redux"
import { logedUserAPI } from "../../Store/Slices/LogedUserSlice/LogedUserAPI"
import { usersFetch } from "../../Store/Slices/UserSlice/API"
export const GamesPage = () => {
    const [games, setGames] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const dispatch = useDispatch()
    useEffect(() => {
        const gamesFetch = async () => {
            const response = await axios.get("http://localhost:3010/games")
            setGames(response.data)
        }
        gamesFetch()
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [])

    const filteredGames =
        selectedCategory === "all"
            ? games
            : games.filter(el => el.category === selectedCategory)
    return (
        <div className={styles.gamepage}>
            <div className={styles.leftSide}>
                <h3>The games will launch on the Friv platform</h3>
                <div className={styles.all} onClick={() => setSelectedCategory("all")}>
                    <img src={allPNG} alt="" />
                    <p>All Games</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("desktop")}>
                    <img src={desktopPNG} alt="" />
                    <p>Desktop Games</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("action")}>
                    <img src={actionPNG} alt="" />
                    <p>Action Games</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("adventures")}>
                    <img src={adenturesPNG} alt="" />
                    <p>Adventure Games</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("ride")}>
                    <img src={driveGamePng} alt="" />
                    <p>Ride Games</p>
                </div>
            </div>
            <div className={styles.gamesBox}>
                {
                    filteredGames?.map((game, ind) => {
                        return (
                            <a href={game.link} target="_blank" key={ind}>
                                <div className={styles.oneOf} key={ind} >
                                    <img src={game.image} />
                                    <div className={styles.info}>
                                        <p>{game.title}</p>
                                        <span>{game.category}</span>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}