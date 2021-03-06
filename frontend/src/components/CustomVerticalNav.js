import React, {useEffect, useState} from "react";
import Nav from "reactstrap/es/Nav";
import NavItem from "reactstrap/es/NavItem";
import Collapse from "./Collapse";
import Button from "reactstrap/es/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowLeft, faArrowRight,
    faAward,
    faBuilding,
    faCalendarAlt, faCircle,
    faPaintRoller, faPen, faPenFancy,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {Link, withRouter} from "react-router-dom";
import NewTaskModal from "./NewTaskModal";
import NewProjectModal from "./NewProjectModal";
import {deleteData, fetchAllData, postData} from "../apiActions/DataApi";
import Loader from 'react-loader-spinner';
import {faFacebookMessenger} from "@fortawesome/free-brands-svg-icons";
import DeleteModal from "./ConfirmModal";


const CustomVerticalNav = (props) => {


    const reload = () => {
        //WE NEED TO MAKE ONE FETCH FUNCTION TO LOAD ARRAY OF STRINGS
        //WE CANT NEST CALLBACKS
        }

    useEffect(() => {
        reload()
    }, []);
    const [tab, setDropdownOpen] = useState(null);

    const toggleDropdown = (t) => {
        if (t !== tab)  {
            setDropdownOpen(t)
            } else {
            setDropdownOpen(null)
        }
    };

    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen)
    };

    let url = props.match.url

    if (!props.location.pathname.includes('/login')) {
        return (
            <React.Fragment>
                <Nav className="float-left vertical-nav text-left" vertical>
                        <NavItem>
                            <Button className="vertical-nav-expand-btn" style={{opacity: isOpen ? 0 : 1 }} onClick={() => toggle()}><FontAwesomeIcon icon={faArrowRight}/></Button>
                        </NavItem>
                    <NavItem>
                        <Button onClick={() => toggleDropdown('USERS')}><FontAwesomeIcon color="blue" icon={faFacebookMessenger}/></Button>
                    </NavItem>
                </Nav>
                <Collapse style={{left: 41 + 'px', position: "absolute"}} isOpen={isOpen} vertical={false}
                          elementMaxLength={'400px'}>
                    <Nav className="vertical-nav bg-dark-grey text-left" vertical>
                        <NavItem>
                            <Button className="vertical-nav-expand-btn" onClick={() => toggle()}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => toggleDropdown('USERS')}>Chat</Button>
                            {tab === "USERS" && props.users.map(user =>
                                        <NavItem>
                                            <Button key={user.id} onClick={() => props.setActive(user.id)}><FontAwesomeIcon icon={faCircle}/> {user.username}</Button>
                                        </NavItem>
                            )}
                        </NavItem>
                    </Nav>
                </Collapse>


            </React.Fragment>
        )
    }
    return null

}

export default withRouter(CustomVerticalNav);
