import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Room from "./Room";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/room" element={<Room />} />
    </Routes>
);

export default AppRoutes;