import React from "react";

const Messages = ({ messages, name }) => {
  const reversedMessages = messages.slice().reverse();
  return (
    <div className="chat" style={{ overflowY: "auto", overflowX: "hidden", height: "100%" }}>
      {reversedMessages.map(({ user, message }, i) => {
        const avatarInitial = user.name.trim()[0].toUpperCase();
        return (
          <div key={i} className="row mb-3 messages">
            <div className="col-2"><div className="user-avatar">{avatarInitial}</div></div>
            <div className="col-10"><span className="message-text">{message}</span></div>
          </div>);})}
    </div>
  );
};

export default Messages;