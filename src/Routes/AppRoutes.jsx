import { Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { SignUpPage } from "../Components/SignUpPage/SignUpPage"
import { General } from "../Pages/General/General"
import { LoginPage } from "../Components/LoginPage/LoginPage"
import { GamesPage } from "../Pages/GamesPage/GamesPage"
import { FriendsNav } from "../Pages/FriendsNav/FriendsNav"
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<Layout />}>
                <Route index element={<General />} />
                <Route path="games" element={<GamesPage />} />
                <Route path="friends" element={<FriendsNav />} />
            </Route>
        </Routes>
    )
}