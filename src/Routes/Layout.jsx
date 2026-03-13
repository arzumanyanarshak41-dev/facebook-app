import { Outlet } from "react-router-dom"
import { NavMenu } from "../Components/NavMenu/NavMenu"
import { Intro } from "./Intro/Intro"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { usersFetch } from "../Store/Slices/UserSlice/API"
import { logedUserAPI } from "../Store/Slices/LogedUserSlice/LogedUserAPI"

export const Layout = () => {
    const [intro, setIntro] = useState(!localStorage.getItem("introShown"))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(usersFetch())
        dispatch(logedUserAPI())
        if (!localStorage.getItem("introShown")) {
            localStorage.setItem("introShown", "true")

            const timer = setTimeout(() => {
                setIntro(false)
            }, 1300)

            return () => clearTimeout(timer)
        }
    }, [])

    if (intro) return <Intro />

    return (
        <div className="layoutContainer">
            <NavMenu />
            <Outlet />
        </div>
    )
}