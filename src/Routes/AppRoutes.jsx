import { Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { SignUpPage } from "../Components/SignUpPage/SignUpPage"
import { General } from "../Pages/General/General"
import { LoginPage } from "../Components/LoginPage/LoginPage"
import { GamesPage } from "../Pages/GamesPage/GamesPage"
import { FriendsNav } from "../Pages/FriendsNav/FriendsNav"
import { FullScreenMessenger } from "../Pages/FullScreenMessenger/FullScreenMessenger"
import { PersonalChat } from "../Pages/FullScreenMessenger/PersonalChat/PersonalChat"
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<Layout />}>
                <Route index element={<General />} />
                <Route path="games" element={<GamesPage />} />
                <Route path="friends" element={<FriendsNav />} />
                <Route path="messenger" element={<FullScreenMessenger />} >
                    <Route path=":id" element={<PersonalChat />} />
                </Route>
            </Route>
        </Routes>
    )
}