import React, {useState, useEffect} from 'react';
import './App.scss';
import LoginPage from "./components/LoginPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Project from "./components/Project";
import Task from "./components/Task";
import Tool from "./components/Tool";
import Assembly from "./components/MessageBox";
import Storage from "./components/Storage";
import CustomHorizontalNav from "./components/CustomHorizontalNav";
import CustomVerticalNav from "./components/CustomVerticalNav";
import {connect} from "react-redux";
import axios from "axios";
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
                        <Route path="/projects/:id">
                            <Project/>
                        </Route>
                        <Route path="/tasks/:id">
                            <Task/>
                        </Route>
                        <Route path="/tools/:id">
                            <Tool/>
                        </Route>
                        <Route path="/storage">
                            <Storage/>
                        </Route>
                        </AppWrapper>
                    </Switch>
            </Router>
            <Footer/>
        </div>
    );
}

export default connect()(App);
