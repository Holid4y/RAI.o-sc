import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/bootstrap.min.css";
import additionalStyles  from "../styles/Main.module.css";

const FIELDS = {
    USERNAME: "username",
    ROOM: "room",
}

const Main = () => {
    const { USERNAME, ROOM } = FIELDS
    const [values, setValues] = useState({[USERNAME]: "", [ROOM]: "" });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some(value => !value);
        if(isDisabled) e.preventDefault();
    };
    
    return ( 
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 mb-3">Смотрите контент вместе</h1>
                <p className="col-lg-10 fs-4">Проект предназначен для совместного просмотра фильмов и видео.  Создавайте или подключайтесь к комнатам. Обсуждайте просмотренный  контент в чате.</p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
                <form className="p-4 p-md-5 rounded-3 bg-body-tertiary">
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    id="login" 
                    placeholder="Введите логин"
                    value={values[USERNAME]}
                    onChange={handleChange}
                    name="username"
                    autoComplete="off"
                    required 
                    />
                    <label htmlFor="login">Логин</label>
                </div>
                <div className="form-floating mb-4">
                    <input 
                    type="text" 
                    className="form-control" 
                    id="idroom" 
                    placeholder="Введите id комнаты"
                    value={values[ROOM]}
                    onChange={handleChange}
                    name="room"
                    autoComplete="off"
                    required 
                    />
                    <label htmlFor="idroom">ID комнаты</label>
                </div>
                <Link 
                    onClick={handleClick}
                    to={`/room?name=${values[USERNAME]}&room=${values[ROOM]}`}>
                    <button type="submit" className="w-100 btn btn-lg btn-primary mb-4">Войти</button>
                </Link>
                    <small class="text-body-secondary">Вы можете ввести ID своей комнаты или подключиться к уже созданной комнате</small>
                </form>
            </div>
            </div>
        </div>
    )
};

export default Main;
