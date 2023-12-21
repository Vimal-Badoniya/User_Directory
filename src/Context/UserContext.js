import React from "react";

const UserContext = React.createContext({
  users: [],
  posts: [],
});

export default UserContext;
