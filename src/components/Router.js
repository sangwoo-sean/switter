import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />} {/* isLoggenIn 일때만 Navigation 생성 */}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </>
                ) : (
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    )}
            </Switch>
        </Router>
    );
};

export default AppRouter;