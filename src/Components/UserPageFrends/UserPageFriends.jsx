import { useState } from "react";
import FriendsCss from "./userPageFriends.module.css";

const friends = [
  {
    id: 1,
    name: "Иван Петров",
    mutual: 12,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    birthday: true,
    following: false,
    recently: true,
  },
  {
    id: 2,
    name: "Анна Смирнова",
    mutual: 8,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    birthday: false,
    following: true,
    recently: false,
  },
  {
    id: 3,
    name: "Алексей Иванов",
    mutual: 5,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    birthday: false,
    following: true,
    recently: true,
  },
  {
    id: 4,
    name: "Мария Кузнецова",
    mutual: 3,
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    birthday: true,
    following: false,
    recently: false,
  },
  {
    id: 5,
    name: "Дмитрий Соколов",
    mutual: 15,
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    birthday: false,
    following: false,
    recently: true,
  },
  {
    id: 6,
    name: "Екатерина Орлова",
    mutual: 6,
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    birthday: false,
    following: true,
    recently: false,
  },
  {
    id: 7,
    name: "Максим Волков",
    mutual: 9,
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    birthday: true,
    following: true,
    recently: true,
  },
  {
    id: 8,
    name: "Ольга Васильева",
    mutual: 11,
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    birthday: false,
    following: false,
    recently: false,
  },
];

export const UserPageFriends = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredFriends = friends
    .filter((friend) =>
      friend.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((friend) => {
      switch (activeTab) {
        case "birthdays":
          return friend.birthday;

        case "following":
          return friend.following;

        case "recentlyAdded":
          return friend.recently;

        default:
          return true;
      }
    });

  return (
    <div className={FriendsCss.page}>
      {/* HEADER */}
      <div className={FriendsCss.header}>
        <div>
          <a href="/" className={FriendsCss.allFriends}>
            Friends
          </a>
        </div>

        <div className={FriendsCss.headerRight}>
          <form
            className={FriendsCss.searchForm}
            onSubmit={(e) => e.preventDefault()}
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
                onChange={(e) => setSearch(e.target.value)}
                className={FriendsCss.searchInput}
              />
            </div>

          </form>

          <button className={FriendsCss.grayBtn}>Friend requests</button>
          <button className={FriendsCss.blueBtn}>Find Friends</button>
          <button className={FriendsCss.dotBtn}>⋯</button>
        </div>
      </div>

      {/* TABS */}
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

      {/* FRIENDS GRID */}
      <div className={FriendsCss.grid}>
        {filteredFriends.map((friend) => (
          <div key={friend.id} className={FriendsCss.card}>
            <div className={FriendsCss.cardLeft}>
              <img src={friend.avatar} alt={friend.name} />

              <div className={FriendsCss.friendsDiv}>
                <a href="/" className={FriendsCss.friendsName}>
                  {friend.name}
                </a>

                <a href="/" className={FriendsCss.mutualFriends}>
                  {friend.mutual} общих друзей
                </a>
              </div>
            </div>

            <button className={FriendsCss.menuBtn}>⋯</button>
          </div>
        ))}
      </div>
    </div>
  );
};