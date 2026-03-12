import { NavLink, Outlet, useLocation } from "react-router-dom"
import style from "./userPageAbout.module.css"

export const UserPageAbout = () => {
  const location = useLocation();
  return (
    <div className={style.UserPageAbout}>
      <div className={`${style.component} ${style.typeAbout}`}>
        <div className={style.typeAboutLeft}>
          <div className={style.title}>About</div>
          <div className={style.items}>
            <NavLink className={`${style.item} ${location.pathname.endsWith("/about") ? style.active : ""}`} to="">
              Intro
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"personal_details"}>
              Personal details
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"work"}>
              Work
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"education"}>
              Education
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"hobbies"}>
              Hobbies
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"interests"}>
              Interests
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"travel"}>
              Travel
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"links"}>
              Links
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"contact_info"}>
              Contact info
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"names"}>
              Names
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item} to={"details_about_you"}>
              Details about you
            </NavLink>
          </div>
        </div>
        <div className={style.typeAboutRight}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
