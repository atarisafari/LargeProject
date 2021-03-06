import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../App';
import SignUP from "./signUp";
import Home from "./home";
import Profile from "./profile";

export default() => {
    return(
        <Router>
            <Route exact path="/" component={App} />
            <Route path="/signUp" component={SignUP} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
        </Router>
    );
}