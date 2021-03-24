import './App.css';
import React, {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";
import CustomHorizontalNav from "./components/CustomHorizontalNav";
import CustomVerticalNav from "./components/CustomVerticalNav";
import {useHistory} from "react-router";
import LoginPage from "./components/LoginPage";
import {Alert} from "reactstrap";
import MessageBox from "./components/MessageBox";
import {fetchAllData, fetchData, postData} from "./apiActions/DataApi";
import {loggedin, login, logout, signup} from "./apiActions/SessionApi";

const AppWrapper = (props) => {
    const history = useHistory();

    useEffect(() => {
        handleLoginStatus(() => {
           reload()
        })
    }, [])

    const reload = () => {
        fetchAllData('users', (data) => {
            setUsers(data)
        })
        fetchAllData('projects', (data) => {
            setProjects(data)
        })
    }


    const handleAlert = (text, color) => {
        setAlert({text: `I felt trying to log you in. ${text}`, color})
        setTimeout(() => setAlert(null), 4500)
    }

    const handleLogout = () => {
        logout((response) => {
            if (response) {
                handleAlert(response.data.status, 'success')
                setLoginStatus(false)
            } else {
                handleAlert(response.data.errors[0], 'danger')
            }
        })
    }
    const handleLogin = (user) => {
        login(user, (response) => {
            if (response.data.logged_in) {
                history.push("/");
                handleAlert(response.data.status, 'success')
                setLoginStatus(response.data.logged_in)
                reload()
            } else {
                handleAlert(response.data.errors[0], 'danger')
                setLoginStatus(false)
                history.push("/login");
            }
        })

    }
    const handleSignup = (user) => {
        signup(user, (response) => {
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
    }

    const handleLoginStatus = (callback) => {
        loggedin((response) => {
            if (response.data.logged_in) {
                history.push("/");
                setLoginStatus(true)
                callback()
            } else {
                history.push("/login");
                setLoginStatus(false)
            }
        })
    }

    const handleActiveUser = (id) => {
        fetchData(id, 'users', (user) => {
            activeUsers.push(user)
            setActive([...activeUsers])
        })
    }


    const [projects, setProjects] = useState(null)
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
            <CustomHorizontalNav projects={projects} onLogout={handleLogout}/>
            {isLoggedIn ?
                <div>
                    <CustomVerticalNav users={users} setActive={(id) => handleActiveUser(id)}/>
                    <Dashboard project_id={history.location.pathname.slice(1)} loggedIn={isLoggedIn}/>
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
