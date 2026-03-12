import eventslogo from "./Images/Icon/event.png"
import friendlogo from "./Images/Icon/friend.png"
import groupslogo from "./Images/Icon/groups.png"
import newsfeedlogo from "./Images/Icon/news-feed.png"
import feedlogo from "./Images/Icon/feed.png"
import pageslogo from "./Images/Icon/facebook-page.png"
import videogamelogo from "./Images/Icon/gaming.png"
import gaminglogo from "./Images/Icon/video-game.png"
import instagramlogo from "./Images/Icon/instagram.png"
import reellogo from "./Images/Icon/reel.png"
import shoplogo from "./Images/Icon/shop.png"
import memorieslogo from "./Images/Icon/memories.png"
import savedlogo from "./Images/Icon/saved.png"
import whatsapplogo from "./Images/Icon/whatsapp.png"
import threadslogo from "./Images/Icon/threads.png"
import cardlogo from "./Images/Icon/Card.png"
import recentlogo from "./Images/Icon/recent.png"
import adsmanagerlogo from "./Images/Icon/Adsmanager.png"
import publicpresencelogo from "./Images/Icon/Publicpresence.png"
import metaailogo from "./Images/Icon/MetaAi.png"
import chatlogo from "./Images/Icon/AiChat.png"

export const PngIcon = ({ name }) => {

    const Icons = {
        metaailogo,
        chatlogo,
        publicpresencelogo,
        adsmanagerlogo,
        recentlogo,
        threadslogo,
        cardlogo,
        whatsapplogo,
        savedlogo,
        memorieslogo,
        shoplogo,
        eventslogo,
        feedlogo,
        friendlogo,
        gaminglogo,
        groupslogo,
        instagramlogo,
        newsfeedlogo,
        pageslogo,
        videogamelogo,
        reellogo,

    }


    return (
        <img src={Icons[name]} alt="" style={{ width: 32, height: 32 }} />
    )
}
