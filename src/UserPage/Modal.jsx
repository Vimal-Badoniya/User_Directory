import React from "react";
import "./Modal.scss";

const Modal = (props) => {
  return (
    <div
      className="modalBackground"
      onClick={() => {
        props.close();
      }}
    >
      <div
        className="modalBody"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modalBody__header">
          <h4>Post Id : {props?.post?.id}</h4>
          <h4>User Id : {props?.post?.userId}</h4>
          <button
            className="closeButton"
            onClick={() => {
              props.close();
            }}
          >
            Close
          </button>
        </div>
        <div className="modalBody__body">
          <h2>TITLE : {props?.post?.title}</h2>
        </div>
        <div className="modalBody__footer">
          <p>{props?.post?.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
