import { Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { SignUpPage } from "../Components/SignUpPage/SignUpPage"
import { General } from "../Pages/General/General"
import { LoginPage } from "../Components/LoginPage/LoginPage"
import { GamesPage } from "../Pages/GamesPage/GamesPage"
import { FriendsNav } from "../Pages/FriendsNav/FriendsNav"
import { FullScreenMessenger } from "../Pages/FullScreenMessenger/FullScreenMessenger"
import { PersonalChat } from "../Pages/FullScreenMessenger/PersonalChat/PersonalChat"
import { Marketplace } from "../Pages/Marketplace/Marketplace"
import { Products } from "../Pages/Marketplace/Products/Products"
import { Reels } from "../Pages/Reels/Reels"
import { UserPage } from "../Pages/UserPage/UserPage"
import { UserPageFriends } from "../Components/UserPageFrends/UserPageFriends"
import { PhotoWindow } from "../Components/PhotoWindow/PhotoWindow"
import { UserPageAll } from "../Components/UserPageAll/UserPageAll"
import { UserPageAbout } from "../Components/UserPageAbout/UserPageAbout"
import { AboutDetailsAboutYou } from "../Components/UserPageAbout/AboutDetailsAboutYou/AboutDetailsAboutYou"
import { AboutContactInfo } from "../Components/UserPageAbout/AboutContactInfo/AboutContactInfo"
import { AboutIntro } from "../Components/UserPageAbout/AboutIntro/AboutIntro"
import { AboutPersonalDetails } from "../Components/UserPageAbout/AboutPersonalDetails/AboutPersonalDetails"
import { AboutWork } from "../Components/UserPageAbout/AboutWork/AboutWork"
import { AboutEducation } from "../Components/UserPageAbout/AboutEducation/AboutEducation"
import { AboutHobbies } from "../Components/UserPageAbout/AboutHobbies/AboutHobbies"
import { AboutInterests } from "../Components/UserPageAbout/AboutInterests/AboutInterests"
import { AboutTravel } from "../Components/UserPageAbout/AboutTravel/AboutTravel"
import { AboutLinks } from "../Components/UserPageAbout/AboutLinks/AboutLinks"
import { AboutNames } from "../Components/UserPageAbout/AboutNames/AboutNames"
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<Layout />}>
                <Route index element={<General />} />
                <Route path="games" element={<GamesPage />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="marketplace/:id" element={<Products />} />
                <Route path="reels" element={<Reels />} />
                <Route path="friends" element={<FriendsNav />} />
                <Route path="photo/:id" element={<PhotoWindow />} />
                <Route path="messenger" element={<FullScreenMessenger />} >
                    <Route path=":id" element={<PersonalChat />} />
                </Route>
                <Route path="userpage/:id" element={<UserPage />}>
                    <Route index element={<UserPageAll />} />
                    <Route path="about" element={<UserPageAbout />}>
                        <Route index element={<AboutIntro />} />
                        <Route path="personal_details" element={<AboutPersonalDetails />} />
                        <Route path="work" element={<AboutWork />} />
                        <Route path="education" element={<AboutEducation />} />
                        <Route path="hobbies" element={<AboutHobbies />} />
                        <Route path="interests" element={<AboutInterests />} />
                        <Route path="travel" element={<AboutTravel />} />
                        <Route path="links" element={<AboutLinks />} />
                        <Route path="contact_info" element={<AboutContactInfo />} />
                        <Route path="names" element={<AboutNames />} />
                        <Route path="details_about_you" element={<AboutDetailsAboutYou />} />
                    </Route>
                    <Route path="frends" element={<UserPageFriends />} />
                </Route>
            </Route>
        </Routes>
    )
}