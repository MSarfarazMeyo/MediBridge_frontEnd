// ChatScreen.js
import React, { useContext, useEffect, useState } from "react";
import "./ChatScreen.scss";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import ChatContext from "../../services/chat-service";
const ChatScreen = () => {
  const context = useContext(ChatContext);

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
  } = context;

  // const navigate = useNavigate();

  // const thirdSegment = window.location.pathname.split("/")[2];

  // navigate(window.location.pathname, { state: thirdSegment });

  // useEffect(() => {
  //   if (!chosenDialog) {
  //     navigate("/ChatScreen");
  //   }
  // }, []);

  return (
    <div className="chat-screen">
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

export default ChatScreen;
