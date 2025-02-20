import React, { useEffect, useState } from "react";
import Chats from "./Chats/Chats";
import "./Sidebar.scss";
import NewChat from "./NewChat/NewChat";
import { BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";

/* eslint-disable */

const Sidebar = (props) => {
  const [searching, setSearching] = useState(false);
  const [searchFor, setSearchFor] = useState();
  const user = useSelector((state) => state.user);

  const {
    dialogs,
    connect,
    connectStatus,
    getChats,
    setDialog,
    chosenDialog,
    startGroupChat,
    startChat,
    searchUsers,
    lastActivity,
  } = props;

  console.log("user", user);

  const [newChatForm, setNewChatForm] = useState(false);
  const createModalRef = React.createRef();
  const [chatType, setChatType] = useState();
  const createChatRef = React.createRef();
  useEffect(() => {
    if (localStorage.token) {
      connect({
        userId: localStorage.userId,
        password: JSON.parse(localStorage.token),
      });
    }

    //eslint-disable-next-line
  }, []);

  const chatsRender = (dialogs, search) => {
    if (search) {
      chats = dialogs.map((dialog) => {
        let name = dialog.name.toLowerCase();
        let filter = name.includes(search.toLowerCase());
        if (filter) {
          return (
            <Chats
              userInfo={dialog}
              setDialog={setDialog}
              chosenDialog={chosenDialog}
              dialogs={dialogs}
              lastActivity={lastActivity}
              key={dialog._id}
            />
          );
        }
        return;
      });
    } else {
      chats = dialogs.map((dialog) => {
        return (
          <Chats
            userInfo={dialog}
            setDialog={setDialog}
            chosenDialog={chosenDialog}
            dialogs={dialogs}
            lastActivity={lastActivity}
            key={dialog._id}
          />
        );
      });
    }
  };

  let chats;

  if (dialogs) {
    if (searching) {
      chatsRender(dialogs, searchFor);
    } else {
      chatsRender(dialogs);
    }
  }

  const contextMenuRef = React.createRef();

  const newChatOpen = () => {
    let modal = createModalRef.current;
    modal.classList.toggle("hide");
    setNewChatForm(true);
    setChatType(3);
  };
  const groupChat = () => {
    let modal = createModalRef.current;
    modal.classList.toggle("hide");
    setNewChatForm(true);
    setChatType(2);
  };
  const newChatClose = () => {
    setNewChatForm(false);
  };

  const creatingChatChose = (e) => {
    let modal = createModalRef.current;
    modal.classList.toggle("hide");
  };

  const closeModals = (e) => {
    e.stopPropagation();
    let modal = createModalRef.current;
    modal.classList.add("hide");
  };
  console.warn(chosenDialog);

  const toggleContextMenuHeader = (leave) => {
    if (leave === "leave") {
      contextMenuRef.current.classList.add("hide");
    } else {
      contextMenuRef.current.classList.toggle("hide");
    }
  };

  console.log("localStorage?.avatar", localStorage?.avatar);

  return (
    <div
      className={`sidebar__container ${chosenDialog ? "" : "show"}`}
      onMouseLeave={closeModals}
    >
      <div
        className="sidebar__header sidebar-header"
        onMouseLeave={() => {
          toggleContextMenuHeader("leave");
        }}
      >
        {/* <div className="sidebar-header__button">
          <div></div>
        </div> */}
        <div
          className="sidebar-user__info"
          onClick={() => {
            toggleContextMenuHeader();
          }}
        >
          <span className="sidebar-user__name">
            {user?.userInfo?.name || 'user'}
          </span>

          <div className="sidebar-img__container">
            {localStorage?.avatar ? (
              <img alt="" className="user__img" src={localStorage?.avatar} />
            ) : (
              <div id="background" className="user__no-img main">
                <span className="name">{localStorage?.login?.slice(0, 2)}</span>
              </div>
            )}
          </div>
        </div>
        <div
          ref={contextMenuRef}
          id="context__menu"
          className="context__menu hide modal"
        >
          {/* <ul>
            <li
            // onClick={() => {
            //   Auth.logout()
            //     .then(() => {
            //       history.go("/login");
            //     })
            //     .catch((error) => {
            //       console.error(error);
            //     });
            // }}
            >
              Logout
            </li> */}
          {/* </ul> */}
        </div>
      </div>

      {newChatForm && (
        <NewChat
          getChats={getChats}
          close={newChatClose}
          type={chatType}
          startGroupChat={startGroupChat}
          startChat={startChat}
          searchUsers={searchUsers}
        />
      )}

      <input
        type="text"
        onChange={(e) => {
          if (e.target.value) {
            setSearchFor(e.target.value);
            setSearching(true);
          } else {
            setSearching(false);
          }
        }}
        className="sidebar-search__chat"
        placeholder="Search..."
      ></input>
      {dialogs && connectStatus && (
        <div className="sidebar-chats__container">{chats}</div>
      )}
      {!connectStatus && <div className="loader">Loading...</div>}
      <div
        ref={createChatRef}
        onClick={creatingChatChose}
        className="sidebar-add__newchat"
      >
        <BsPencil size={24} color="white" />
      </div>
      <div ref={createModalRef} className="chat-create-menu hide">
        <ul>
          {/* <li style={{ color: "black" }} onClick={groupChat}>
            New group
          </li> */}
          <li style={{ color: "black", width: "100%" }} onClick={newChatOpen}>
            New message
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
