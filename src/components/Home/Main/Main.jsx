import React from "react";
import "./Main.scss";
/* eslint-disable */

import { useEffect, useState } from "react";
import Message from "./Message/Message";
import UserInfo from "./UserInfo/UserInfo";
import { animateScroll } from "react-scroll";
import { IoMdAttach } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import Profile from "./Profile/Profile";
import { useRef } from "react";

const Main = (props) => {
  const {
    sendMessage,
    chosenDialog,
    getMessages,
    messages,
    usersInGroups,
    sendTypingStatus,
    typeStatus,
    sendMsgWithPhoto,
    lastActivity,
    setDialog,
    removeUser,
    searchUsers,
  } = props;

  const dialog = chosenDialog;
  const [showProfile, setShowProfile] = useState();
  const fileMessageRef = React.createRef();
  const messageRef = React.createRef();
  const messagesRef = React.createRef();
  const [typingPrevStatus, setTypingPrevStatus] = useState();
  const typingPrevStatusRef = useRef();
  const [allMessages, setAllMessages] = useState();
  let timer;
  window.onbeforeunload = function (event) {
    if (typingPrevStatusRef.current) {
      if (dialog.type === 3) {
        const occupant = dialog.occupants_ids.filter((e) => {
          return e !== parseInt(localStorage.userId);
        });
        sendTypingStatus(false, occupant[0]);
      } else {
        sendTypingStatus(false, dialog._id);
      }
    }
  };
  useEffect(() => {
    setAllMessages();
    setTypingPrevStatus(false);
  }, [dialog]);

  useEffect(() => {
    //  scrollToBottom();
  }, [allMessages]);
  const startTyping = () => {
    clearTimeout(timer);

    if (!typingPrevStatusRef.current) {
      typingPrevStatusRef.current = true;
      if (dialog.type === 3) {
        const occupant = dialog.occupants_ids.filter((e) => {
          return e !== parseInt(localStorage.userId);
        });
        sendTypingStatus(true, occupant[0]);
      } else {
        sendTypingStatus(true, dialog._id);
      }
    }
    timer = setTimeout(() => {
      if (typingPrevStatusRef.current) {
        typingPrevStatusRef.current = false;
        if (dialog.type === 3) {
          const occupant = dialog.occupants_ids.filter((e) => {
            return e !== parseInt(localStorage.userId);
          });
          sendTypingStatus(false, occupant[0]);
        } else {
          sendTypingStatus(false, dialog._id);
        }
      }
    }, 3000);
  };

  const toggleProfile = () => {
    if (showProfile) {
      setShowProfile(false);
    } else {
      setShowProfile(true);
    }
  };

  const onFileSelected = (e) => {
    const file = e.currentTarget.files[0];
    const type = file.type.split("/")[1];
    const url = URL.createObjectURL(file);
    if (
      type === "svg+xml" ||
      type === "image" ||
      type === "webp" ||
      type === "png" ||
      type === "jpeg"
    ) {
      sendMsgWithPhoto(file, url);
      if (typingPrevStatusRef.current) {
        if (dialog.type === 3) {
          const occupant = dialog.occupants_ids.filter((e) => {
            return e !== parseInt(localStorage.userId);
          });
          sendTypingStatus(false, occupant[0]);
        } else {
          sendTypingStatus(false, dialog._id);
        }
      }
    } else {
      alert("File format is not supported");
    }
    e.target.value = "";
  };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: messagesRef.current.id,
    });
  };

  useEffect(() => {
    if (messages) {
      if (messages[chosenDialog._id]) {
        console.table("MESSAGES: ", messages[chosenDialog._id]);
        for (let i = 0; i < messages[chosenDialog._id].length; i++) {
          setAllMessages(() => {
            return messages[chosenDialog._id].map((e, index) => {
              return (
                <Message
                  usersInGroups={usersInGroups}
                  key={index}
                  message={e}
                  dialogInfo={dialog}
                />
              );
            });
          });
        }
      }
    }
  }, [messages, usersInGroups]);

  const onSendMessage = (e) => {
    const opponentId = dialog.occupants_ids.filter(
      (id) => id !== parseInt(localStorage.userId)
    )[0];
    if (typingPrevStatusRef.current) {
      if (dialog.type === 3) {
        sendTypingStatus(false, opponentId);
      } else {
        sendTypingStatus(false, dialog._id);
      }
    }
    if (messageRef.current.value.trim()) {
      let message = messageRef.current.value.replaceAll("\n+", "\n");
      message = message.replaceAll("((?!\n+)\\s+)", " ");
      message = message.replaceAll("((?!\n+)\\s+)", "");

      sendMessage(dialog, message, opponentId);
      messageRef.current.style.height = "45px";
      messageRef.current.value = "";
    }
    scrollToBottom();
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className={`main__container ${chosenDialog ? "show" : ""}`}>
      <Profile
        chosenDialog={chosenDialog}
        toggleProfile={toggleProfile}
        searchUsers={searchUsers}
        setDialog={setDialog}
        userInfo={dialog}
        lastActivity={lastActivity}
        usersInGroups={usersInGroups}
        showProfile={showProfile}
      />
      <div className={`main__content ${showProfile ? "small" : ""}`}>
        <div className="main__header">
          {dialog && (
            <UserInfo
              toggleProfile={toggleProfile}
              setDialog={setDialog}
              userInfo={dialog}
              usersInGroups={usersInGroups}
              typeStatus={typeStatus}
              lastActivity={lastActivity}
            />
          )}
          {!dialog && <div className="header-none">Chats</div>}
        </div>
        <div
          id="messages__container"
          className="messages__container"
          ref={messagesRef}
        >
          {dialog && (
            <div id="messages" className="messages">
              {allMessages ? (
                allMessages
              ) : (
                <span className="no-msg">NO MESSAGES YET</span>
              )}
              {chosenDialog.unread_messages_count > 0 && (
                <div
                  onClick={scrollToBottom}
                  className="unread__messages-scroll"
                >
                  <IoIosArrowDown size={26} />
                  <div className="unread__messages-counter">
                    <span>{chosenDialog.unread_messages_count}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          {!dialog && <div className="choose__chat">Choose a chat</div>}
        </div>
        {dialog && (
          <form
            className="message__field"
            action="#"
            method="GET"
            onKeyDown={onEnterPress}
          >
            <textarea
              onKeyDown={startTyping}
              ref={messageRef}
              className="message__area"
              placeholder="Enter message"
            ></textarea>
            <label htmlFor="file-upload" className="custom-file-upload">
              <IoMdAttach size={28} />
            </label>
            <input
              onChange={onFileSelected}
              ref={fileMessageRef}
              id="file-upload"
              type="file"
              accept="image/*"
            />

            <button onClick={onSendMessage} type="button" className="send-btn">
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Main;
