import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";
import Users from "./Users";

const socket = io.connect("http://localhost:5000");

const Room = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState({ room: "", user: "" });
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [isOpen, setOpen] = useState(false);
    const emojiRef = useRef(null);
    const [users, setUsers] = useState(0);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit("join", searchParams);
    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => { setState((_state) => [..._state, data]) });
        return () => { socket.off("message") };
      }, []);

    useEffect(() => {
        socket.on("room", ({ data: { users } }) => {
            setUsers(users.length);
        });
    }, []);

    useEffect(() => {
        socket.on("room", ({ data: { users } }) => {
            setUsersList(users);
        });
        return () => {
            socket.off("room");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {setOpen(false)}};
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside);};
    }, []);

    const toggleEmojiPanel = () => { setOpen(!isOpen) };
    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);
    
    const exitRoom = () => {
        socket.emit("exitRoom", { params });
        navigate("/")};
    
    const handleChange = ({ target: { value } }) => setMessage(value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        socket.emit("sendMessage", { message, params });
        setMessage("")};

    
    return (
        <div className="row">
            <div className="col-lg-9 p-2">
                <div className="d-flex align-items-center justify-content-center bg-body-tertiary rounded" style={{ height: "80vh" }}>
                    <h3>Фильм</h3>
                </div>
            </div>
            <div className="col-lg-3 p-2">
                <div className="d-flex flex-column justify-content-between bg-body-tertiary rounded px-3 pt-3" style={{ height: "80vh" }}>
                    <div className="text-center d-flex justify-content-between align-items-center mb-3 px-2">
                        <h2 className="mb-0 mr-auto">{params.room}</h2>
                        <a style={{ cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </a>
                    </div>

                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">Пользователей: {users}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <Users users={usersList} />
                        </div>
                        <button onClick={exitRoom} className="btn btn-danger m-4" aria-label="Close">Выйти</button>
                    </div>

                    <div className="chat" style={{ overflowY: "auto", overflowX: "hidden", height: "100%" }}>
                        <Messages messages={state} name={params.name} />
                    </div>

                    <form className="input-group mb-3 rounded align-items-center" style={{ backgroundColor: "#111119" }} onSubmit={handleSubmit}>
                        <input type="text" className="form-control" placeholder="Введите сообщение" aria-label="Введите сообщение" aria-describedby="button-addon2" value={message} onChange={handleChange} />
                        <div className="input-group-append">
                            <button className="btn" onClick={toggleEmojiPanel} type="button" id="button-addon2">🙂</button>
                            <button className="btn btn-primary m-2" type="submit" onSubmit={handleSubmit} value="sendMessage">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </button>
                            
                        </div>
                        <div ref={emojiRef}>
                            {isOpen && (
                                <div className="position-absolute bottom-0 end-0" style={{ zIndex:2 }}>
                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Room;
