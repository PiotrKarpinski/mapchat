import './App.css';
import React, {Component, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import CustomHorizontalNav from "./components/CustomHorizontalNav";
import CustomVerticalNav from "./components/CustomVerticalNav";
import {useHistory} from "react-router";
import LoginPage from "./components/LoginPage";
import {Alert, UncontrolledAlert} from "reactstrap";
import Assembly from "./components/MessageBox";
import MessageBox from "./components/MessageBox";
import {fetchAllData, fetchData, postData} from "./components/actions";

const AppWrapper = (props) => {
    const history = useHistory();

    useEffect(() => {
        loginStatus(status => {
            setLoginStatus(status)
            fetchAllData('users', (data) => {
                setUsers(data)
            })
        })
    }, [])

    const handleLogin = (user) => {
        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    history.push("/");
                    handleAlert(response.data.status, 'success')
                    setLoginStatus(response.data.logged_in)
                } else {
                    handleAlert(response.data.errors[0], 'danger')
                    setLoginStatus(false)
                    history.push("/login");
                }
            })
            .catch(error => console.log('api errors:', error))
    };

    const handleLogout = () => {
        axios.post('http://localhost:3001/logout',null,{withCredentials: true})
            .then(response => {
                if (response) {
                    handleAlert(response.data.status, 'success')
                    setLoginStatus(false)
                } else {
                    handleAlert(response.data.errors[0], 'danger')
                }
            })
            .catch(error => console.log('api errors:', error))
    };

    const handleAlert = (text, color) => {
        setAlert({text: `I felt trying to log you in. ${text}`, color})
        setTimeout(() => setAlert(null), 4500)
    }

    const handleSignup = (user) => {

        axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
            .then(response => {
                if (response.data.status === 'created') {
                    handleAlert(response.data.status, 'success')
                    setLoginStatus(response.data.logged_in)
                    history.push("/");
                } else {
                    history.push("/login");
                    handleAlert(response.data.errors[0], 'info')
                    setLoginStatus(false)
                }
            })
            .catch(error => console.log('api errors:', error))
    };

    const handleActiveUser = (id) => {
        fetchData(id, 'users', (user) => {
            activeUsers.push(user)
            setActive([...activeUsers])
        })
    }

    const loginStatus = (callback) => {
        axios.get('http://localhost:3001/logged_in',
            {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    history.push("/");
                    callback(response.data.logged_in)
                } else {
                    history.push("/login");
                    setLoginStatus(false)
                }
            })
            .catch(error => console.log('api errors:', error))
    };
    const [isLoggedIn, setLoginStatus] = useState(false)
    const [alert, setAlert] = useState(null)
    const [users, setUsers] = useState([])
    const [activeUsers, setActive] = useState([])


    return (
        <div className="AppWrapper">
            {alert &&
            <div className="alert-nav">
                <Alert isOpen={alert && true} toggle={setAlert} color={alert.color}>
                    {alert.text}
                </Alert>
            </div>}
            <CustomHorizontalNav onLogout={handleLogout}/>
            {isLoggedIn ?
                <div>
                    <CustomVerticalNav users={users} setActive={(id) => handleActiveUser(id)} setWidth={props.setWidthHandler}/>
                    <Dashboard loggedIn={isLoggedIn}/>}
                    {activeUsers.map(user =>
                        <MessageBox box={user}/>)
                    }
                </div>
                : <LoginPage onLogin={handleLogin} onSignup={handleSignup}/>
            }
        </div>
    );
}

export default AppWrapper;
