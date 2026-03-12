import { useMemo, useState } from "react";
import FriendsCss from "./userPageFriends.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { selectUsers } from "../../Store/Slices/UserSlice/UserSlice";
import { useSelector } from "react-redux";

export const UserPageFriends = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { id } = useParams();
  const navigate = useNavigate()
  const users = useSelector(selectUsers);

  // Найти пользователя, страница которого открыта
  const logedUser = users.find(el => el.id === id);

  // Получить друзей текущего пользователя
  const friends = useMemo(() => {
    if (!logedUser?.friends) return [];
    return users.filter(user => logedUser.friends.includes(user.id));
  }, [users, logedUser]);

  // Фильтрация по поиску и вкладкам
  const filteredFriends = friends
    .filter(friend =>
      `${friend.fname} ${friend.lname}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter(friend => {
      switch (activeTab) {
        case "birthdays":
          return !!friend.bdate; // оставляем тех, у кого есть дата рождения
        case "recentlyAdded":
          // предположим, что недавно добавленные – это первые 5 друзей в списке
          return friends.indexOf(friend) < 5;
        case "following":
          // если поле following есть у пользователя
          return logedUser.following?.includes(friend.id);
        default:
          return true;
      }
    });

  return (
    <div className={FriendsCss.page}>
      <div className={FriendsCss.header}>
        <div>
          <a href="/" className={FriendsCss.allFriends}>
            Friends
          </a>
        </div>

        <div className={FriendsCss.headerRight}>
          <form
            className={FriendsCss.searchForm}
            onSubmit={e => e.preventDefault()}
          >
            <div className={FriendsCss.searchWrapper}>
              <svg
                width="14"
                height="14"
                fill="currentColor"
                className={FriendsCss.searchIcon}
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>

              <input
                type="text"
                placeholder="Search friends"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={FriendsCss.searchInput}
              />
            </div>
          </form>

          <button className={FriendsCss.grayBtn}>Friend requests</button>
          <button className={FriendsCss.blueBtn}>Find Friends</button>
          <button className={FriendsCss.dotBtn}>⋯</button>
        </div>
      </div>

      <div className={FriendsCss.tabs}>
        <span
          className={activeTab === "all" ? FriendsCss.active : ""}
          onClick={() => setActiveTab("all")}
        >
          All Friends
        </span>

        <span
          className={activeTab === "recentlyAdded" ? FriendsCss.active : ""}
          onClick={() => setActiveTab("recentlyAdded")}
        >
          Recently Added
        </span>

        <span
          className={activeTab === "birthdays" ? FriendsCss.active : ""}
          onClick={() => setActiveTab("birthdays")}
        >
          Birthdays
        </span>

        <span
          className={activeTab === "following" ? FriendsCss.active : ""}
          onClick={() => setActiveTab("following")}
        >
          Following
        </span>
      </div>

      <div className={FriendsCss.grid}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map(friend => (
            <div key={friend.id} className={FriendsCss.card}>
              <div className={FriendsCss.cardLeft}>
                <img src={friend.profile_image} alt={`${friend.fname}`} />

                <div className={FriendsCss.friendsDiv}>
                  <a href={`/home/userPage/${friend.id}`} className={FriendsCss.friendsName}>
                    {friend.fname} {friend.lname}
                  </a>

                  <p  className={FriendsCss.mutualFriends}>
                    {friend.mutual || 0} общих друзей
                  </p>
                </div>
              </div>

              <button className={FriendsCss.menuBtn}>⋯</button>
            </div>
          ))
        ) : (
          <p>No friends found</p>
        )}
      </div>
    </div >
  );
};