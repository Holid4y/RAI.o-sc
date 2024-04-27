import React from "react";

const Users = ({ users }) => {
  return (
    <div className="listUsers" style={{ overflowY: "auto", overflowX: "hidden", height: "100%" }}>
      {users.map(({ name }, i) => {
        const avatarInitial = name.trim()[0].toUpperCase();
        return (
          <div key={i} className="row mb-3 messages">
            <div className="col-2"><div className="user-avatar-list">{avatarInitial}</div></div>
            <div className="col-10"><span className="message-text">{name}</span></div>
          </div>);
        })}
    </div>
  );
};

export default Users;