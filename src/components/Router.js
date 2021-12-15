import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {
                    isLoggedIn 
                    ?
                        <>
                            <Route exact={true} path="/" element={<Home userObj={userObj} />} />
                            <Route exact={true} path="/profile" element={<Profile />} />
                        </>
                    : <Route exact={true} path="/" element={<Auth />} />
                }
            </Routes>
        </Router>
    );
};

export default AppRouter;