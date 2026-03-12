import styles from "./generalmenu.module.css";
import { GeneralMenuLeft } from "../GeneralMenuLeft/GeneralMenuLeft";
import { GeneralMenuRight } from "../GeneralMenuRight/GeneralMenuRight";

export const GeneralMenu = () => {
  const sections = [
    {
      title: "Social",
      items: [
        {
          icon: "eventslogo",
          title: "Events",
          subtitle:
            "Organize or find events and other things to do online and nearby.",
        },
        {
          icon: "friendlogo",
          title: "Friends",
          subtitle: "Search for friend or people you may know.",
        },
        {
          icon: "groupslogo",
          title: "Groups",
          subtitle: "Connect with people who share your interests.",
        },
        {
          icon: "newsfeedlogo",
          title: "News Feed",
          subtitle:
            "See relevant posts from people and Pages you follow.",
        },
        {
          icon: "feedlogo",
          title: "Feeds",
          subtitle:
            "See the most recent posts from your friends, groups, Pages and more.",
        },
        {
          icon: "pageslogo",
          title: "Pages",
          subtitle:
            "Discover and connect with businesses on Facebook.",
        },
      ],
    },
    {
      title: "Entertainment",
      items: [
        {
          icon: "videogamelogo",
          title: "Gaming Video",
          subtitle:
            "Watch and connect with your favorite games and streamers",
        },
        {
          icon: "gaminglogo",
          title: "Play games",
          subtitle: "Play your favorite games",
        },
        {
          icon: "reellogo",
          title: "Reels",
          subtitle:
            "A Reels destination personalized to your interests and connections",
        },
      ],
    },
    {
      title: "Shopping",
      items: [
        {
          icon: "cardlogo",
          title: "Orders and payments",
          subtitle:
            "A seamless, secure way to pay on the apps you already use.",
        },
        {
          icon: "shoplogo",
          title: "Marketplace",
          subtitle: "Buy and sell in your community.",
        },
      ],
    },
    {
      title: "Personal",
      items: [
        {
          icon: "recentlogo",
          title: "Recent ad activity",
          subtitle:
            "See all the ads you interacted with on Facebook.",
        },
        {
          icon: "memorieslogo",
          title: "Memories",
          subtitle:
            "Browse your old photos, videos and posts on Facebook.",
        },
        {
          icon: "savedlogo",
          title: "Saved",
          subtitle:
            "Find posts, photos and videos that you saved for later.",
        },
      ],
    },
    {
      title: "Professional",
      items: [
        {
          icon: "adsmanagerlogo",
          title: "Ads Manager",
          subtitle:
            "Create, manage and track the performance of your ads.",
        },
        {
          icon: "publicpresencelogo",
          title: "Public presence",
          subtitle:
            "Get tools to help you grow on Facebook.",
        },
      ],
    },
    {
      title: "More from Meta",
      items: [
        {
          icon: "metaailogo",
          title: "Meta AI",
          subtitle:
            "Ask questions, brainstorm ideas, create any image you can imagine and more.",
        },
        {
          icon: "chatlogo",
          title: "Chat with AIs",
          subtitle:
            "Create and discover AIs for fun conversations or helpful advice.",
        },
        {
          icon: "threadslogo",
          title: "Threads",
          subtitle:
            "Say more with Threads — Instagram’s text-based conversation app.",
        },
        {
          icon: "whatsapplogo",
          title: "whatsApp",
          subtitle:
            "Message and call people privately on your computer.",
        },
        {
          icon: "instagramlogo",
          title: "Instagram",
          subtitle:
            "See everyday moments from people you love.",
        },
      ],
    },
  ];

  const createItems = [
    { label: "Post", icon: "Post" },
    { label: "Story", icon: "Book" },
    { label: "Reels", icon: "Reels" },
    { label: "Life update", icon: "Edit" },
    { label: "Page", icon: "Page" },
    { label: "Ad", icon: "Ad" },
    { label: "Event", icon: "Event" },
    { label: "Marketplace Listing", icon: "Marketplace" },
  ];

  return (
    <div className={styles.GeneralMenu}>
      <h2>Menu</h2>
      <div className={styles.MenuContent}>
        <GeneralMenuLeft sections={sections} />
        <GeneralMenuRight createItems={createItems} />
      </div>
    </div>
  );
};