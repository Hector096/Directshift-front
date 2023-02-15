import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Switch, Route } from "react-router-dom";
import { clearMessage } from "./redux/action/message";
import Home from "./component/Home";
import SignIn from "./component/Signin";
import Signup from "./component/Signup";
import PageNotFound from "./component/PageNotFound";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(clearMessage()); // clear message when changing location
    }, [dispatch, location]);

    return (
        <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route path="/:id" component={Signup} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    );
}

export default App;
