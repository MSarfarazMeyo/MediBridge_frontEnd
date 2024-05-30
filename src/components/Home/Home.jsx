import React from "react";
import "./Home.scss";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/* eslint-disable */

const Home = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const segments = pathname.split("/");
  const data = segments[2];

  const {
    dialogs,
    connectToChat,
    getChats,
    chosenDialog,
    setDialog,
    getMessages,
    messages,
    sendMessage,
    startGroupChat,
    startChat,
    usersInGroups,
    searchUsers,
    sendTypingStatus,
    typeStatus,
    sendMsgWithPhoto,
    lastActivity,
    removeUser,
    connectStatus,
  } = props.chat;

  useEffect(() => {
    if (!chosenDialog) {
      navigate("/chat", { state: { id: data } });
    }
  }, []);

  // history.location.state = history.location.pathname.split("/")[2];
  return (
    <div className="home__container">
      <Sidebar
        className="sidebar__block"
        dialogs={dialogs}
        connect={connectToChat}
        getChats={getChats}
        setDialog={setDialog}
        chosenDialog={chosenDialog}
        startGroupChat={startGroupChat}
        startChat={startChat}
        searchUsers={searchUsers}
        typeStatus={typeStatus}
        lastActivity={lastActivity}
        connectStatus={connectStatus}
      />
      <Main
        className="main__block"
        getMessages={getMessages}
        messages={messages}
        searchUsers={searchUsers}
        dialogs={dialogs}
        sendMessage={sendMessage}
        removeUser={removeUser}
        sendMsgWithPhoto={sendMsgWithPhoto}
        chosenDialog={chosenDialog}
        usersInGroups={usersInGroups}
        setDialog={setDialog}
        sendTypingStatus={sendTypingStatus}
        typeStatus={typeStatus}
        lastActivity={lastActivity}
      />
    </div>
  );
};

export default Home;
