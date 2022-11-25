import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/routesGuard";

// import history.js here
import { history } from "./helpers/history";

// import pages
import Home from "./pages/home";
import Login from "./pages/login"

function Routes() {
    return (
        <Router history={history}>
           <Switch>
            <RouteGuard
                exact
                path="/"
                component={Home}
            />
               
            <Route
                path="/login"
                component={Login}
            />
            <Redirect to="/login" />
           </Switch>
       </Router>
    )
}

export default Routes;