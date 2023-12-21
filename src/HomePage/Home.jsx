import React, { useContext } from "react";
import UserContext from "../Context/UserContext";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const data = useContext(UserContext);
  const navigate = useNavigate();
  let users = data?.users;
  let posts = data?.posts;
  function getNumberOfPosts(userId) {
    let totalPosts = 0;
    posts.forEach((post) => {
      if (post.userId === userId) {
        totalPosts++;
      }
    });
    return totalPosts;
  }
  function clickHandler(user) {
    // let clickedUserId = user.id;
    // navigate(`/user/${clickedUserId}`);
    navigate(`/user/${user.id}`);
  }
  return (
    <div className="directoryContainer">
      <div className="homeTitleContainer">
        <h1 className="homeTitleContainer__title">User Directory</h1>
      </div>
      <div className="usersContainer">
        {!users ? (
          <h4>Fetching Data Please Wait...</h4>
        ) : (
          users?.map((user) => {
            let numberOfPosts = getNumberOfPosts(user.id);
            return (
              <div
                className="usersContainer__user"
                key={user.id}
                onClick={() => {
                  clickHandler(user);
                }}
              >
                <span className="usersContainer__userNameAndPost">
                  <h4 className="usersContainer__userName">Name :</h4>
                  {user.name}
                </span>{" "}
                <span className="usersContainer__userNameAndPost">
                  <h4 className="usersContainer__userName">Posts :</h4>
                  {numberOfPosts}
                </span>{" "}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
