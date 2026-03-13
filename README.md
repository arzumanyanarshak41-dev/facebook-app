# Facebook App Clone

⚠️ **This project is not affiliated with Facebook or Meta in any way. It is built purely for educational purposes.**

**About:**  
This is a **learning project inspired by Facebook**, built to practice React, Redux, and Front-End development.

A modern **Facebook-like social network application** built with **React, Redux Toolkit, and modern Front-End technologies**.

This project replicates the core functionality of Facebook including authentication, posts, comments, messenger, friends, and user profiles.

It was built as a large learning project to practice **Front-End architecture, state management, API integration, and real-world UI development**.

---

# Demo

Coming soon...

---

# Features

## Authentication

- User signup
- User login
- Session persistence
- Logout functionality

## User Profile

- Personal profile page
- Change profile photo
- Edit personal information
- Display user posts

## Posts System

- Create posts
- View posts
- Like system
- Comment system
- Dynamic rendering of posts

## Friends System

- View friends
- Friend suggestions
- Friend navigation panel

## Messenger

- Chat interface
- Chat navigation
- Message UI

## Notifications

- Notification system
- UI indicators

## Navigation

- Sidebar navigation
- Responsive menu
- Messenger popup

---

# Tech Stack

## Front-End

- React
- React Router
- Redux Toolkit
- Axios

## Styling

- CSS Modules
- Responsive design

## State Management

- Redux
- Async Thunks
- Global state architecture

## Backend (Mock API)

- JSON Server

---

# Project Structure

    src
    │
    ├── Components
    │   ├── NavMenu
    │   ├── FriendsNav
    │   ├── Messenger
    │   └── UI Components
    │
    ├── Pages
    │   ├── Home
    │   ├── Profile
    │   ├── Messenger
    │   └── Auth Pages
    │
    ├── Store
    │   ├── Slices
    │   │   ├── UserSlice
    │   │   ├── LogedUserSlice
    │   │   └── PostsSlice
    │   │
    │   └── Store Configuration
    │
    ├── API
    │   └── Axios requests

---

# Installation

Clone the repository

    git clone https://github.com/arzumanyanarshak41-dev/facebook-app.git

Go to the project folder

    cd facebook-app

Install dependencies

    npm install

Start the project

    npm start

---

# API

This project uses a **local JSON server** as a mock backend.

Run JSON server

    npx json-server --watch db.json --port 3010

---

# Key Learning Goals

This project was built to practice:

- Large scale React project structure
- Redux state management
- Async data fetching
- Component architecture
- UI replication of real social networks
- Handling complex state interactions

---

# Future Improvements

- Real backend (Node.js + Express)
- Real-time messaging with WebSockets
- Notifications system
- Performance optimizations
- Mobile responsive improvements
- Image uploads
- Authentication with JWT

---

# License

## This project is for **educational purposes**.

## Screenshots

### Home Page

![Home Page](./src/Asets/GeneralScreen.png)

### FullScreen Messenger

![FullScreen Messenger](./src/Asets/FullScreenMessengerScreen.jpg)

### Games Page

![Games Page](./src/Asets/gamesScreen.png)

### Marketplace

![Marketplace](./src/Asets/MarketplaceScreen.png)

### Products

![Products](./src/Asets/ProductScreen.png)

### Add Post

![Add Post](./src/Asets/AddPostScreen.png)

### User Page

![User Page](./src/Asets/UserPageScreen.png)

---

# Author

**Arshak Arzumanyan**

## Frontend Developer (React)

---

## Installation

### Clone the repository

```bash
git clone https://github.com/arzumanyanarshak41-dev/facebook-app.git
cd facebook-app
npm install
npm start
```
