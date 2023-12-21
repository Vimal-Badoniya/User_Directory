import React from "react";
import { useNavigate } from "react-router-dom";
import './UserPage/Modal.scss'

const ErrorHandler = () => {
  const navigate = useNavigate();
  const gotoButtonHandler = () => {
    navigate("/");
  };
  return (
    <div>
      <h2>Unexpected Application Error!</h2>
      <h3>
        Please <button className="closeButton" onClick={gotoButtonHandler}>Click Here!</button> To Go To
        Home Page
      </h3>
    </div>
  );
};

export default ErrorHandler;
