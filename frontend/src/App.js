import React from 'react';
import './App.scss';
import LoginPage from "./components/LoginPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import {connect} from "react-redux";
import AppWrapper from "./AppWrapper";


function App() {

    return (
        <div className="App">
            <Router>
                    <Switch>
                        <AppWrapper>
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="">
                            <Dashboard/>
                        </Route>
                        </AppWrapper>
                    </Switch>
            </Router>
            <Footer/>
        </div>
    );
}

export default connect()(App);
