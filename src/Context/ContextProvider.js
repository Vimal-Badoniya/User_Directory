import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  async function updateUserData() {
    try {
      let users = await fetch("https://jsonplaceholder.typicode.com/users");
      let posts = await fetch("https://jsonplaceholder.typicode.com/posts");
      let usersData = await users.json();
      let postsData = await posts.json();
      setUserData({
        users: usersData,
        posts: postsData,
      });
    } catch (error) {
      console.error("Error Occured! While fetching user data");
    }
  }
  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default ContextProvider;
