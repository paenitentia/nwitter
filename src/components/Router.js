import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div className="routes">
            <Routes>
                {
                    isLoggedIn 
                    ?   
                        <>
                        
                            <Route exact={true} path="/" element={<Home userObj={userObj} />} />
                            <Route exact={true} path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                        </>
                    : <Route exact={true} path="/" element={<Auth />} />
                }
            </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;