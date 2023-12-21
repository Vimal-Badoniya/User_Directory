import React, { useCallback, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../Context/UserContext";
import CountryClock from "./CountryClock";
import Modal from "./Modal";
import "./User.scss";
import ErrorHandler from "../ErrorHandler";

const User = () => {
  const [isShowModal, setIsSHowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { userId } = useParams();
  const { users, posts } = useContext(UserContext);
  let userArray = users?.filter((user) => {
    return user?.id == userId;
  });
  let user = userArray ? userArray[0] : null;
  let userPosts = posts?.filter((post) => {
    return post?.userId == userId;
  });
  const postClickHandler = useCallback((postData) => {
    setModalData(postData);
    setIsSHowModal(true);
  });
  const closeModal = () => {
    setIsSHowModal(false);
  };
  if (userId > users.length) {
    return <ErrorHandler />;
  }
  return (
    <div className="profileContainer">
      <CountryClock />
      <div className="userDetailsContainer">
        <div className="userDetailsContainer__userDetails">
          <div className="userDataKeys">
            <p className="userDetails">Name</p>
            <p className="userDetails">Email</p>
            <p className="userDetails">UserName</p>
          </div>
          <div className="userData">
            <p className="userDetails">: {user?.name}</p>
            <p className="userDetails">: {user?.email}</p>
            <p className="userDetails">: {user?.username}</p>
          </div>
        </div>
        <div className="userDetailsContainer__userDetails">
          <div className="userDataKeys">
            <p className="userDetails">Address</p>
            <p className="userDetails">Phone</p>
            <p className="userDetails">Website</p>
          </div>
          <div className="userData">
            <p className="userDetails">: {user?.address?.city}</p>
            <p className="userDetails">: {user?.phone}</p>
            <p className="userDetails">: {user?.website}</p>
          </div>
        </div>
      </div>
      <div className="postsContainer">
        {userPosts?.map((post) => {
          return (
            <div
              key={post.id}
              className="postCard"
              onClick={() => {
                postClickHandler(post);
              }}
            >
              <h3 className="postCard__title">{post.title}</h3>
              <p className="postCard__body">{post.body}</p>
            </div>
          );
        })}
      </div>
      {isShowModal && <Modal close={closeModal} post={modalData} />}
    </div>
  );
};

export default User;
