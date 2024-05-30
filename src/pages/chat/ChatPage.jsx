import React from "react";
import { useNavigate } from "react-router-dom";
import Home from "../../components/Home/Home";

export const ChatPage = (props) => {
  const navigate = useNavigate();

  if (!localStorage.token) {
    navigate("/");
  }

  return (
    <div
      style={{
        textAlign: "center",
        width: "100vw",
        backgroundColor: "#282c34",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "black",
      }}
    >
      <Home chat={props.chat} />
    </div>
  );
};
