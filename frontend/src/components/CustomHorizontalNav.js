import React, {useState} from "react";
import Navbar from "reactstrap/es/Navbar";
import ButtonDropdown from "reactstrap/es/ButtonDropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import Button from "reactstrap/es/Button";
import Col from "reactstrap/es/Col";
import {Link, withRouter} from "react-router-dom";
import RegisterModal from "./RegisterModal";
import {faAward} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFantasyFlightGames} from "@fortawesome/free-brands-svg-icons";


const CustomHorizontalNav = (props) => {

    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen)
    };

    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen)
    };


    return (
        <Navbar color="dark">
            <RegisterModal isOpen={isOpen} toggle={toggle}/>
            {
                !props.location.pathname.includes('login') &&
                <React.Fragment>
                    <Col md={9}>
                        {props.projects && props.projects.map(p =>
                        <Link to={`/${p.id}`}>
                            <div style={{color: p.color}} className="project-link-circle">
                                {p.prefix}
                            </div>

                        </Link>
                        )}


                    </Col>
                    <Col md={3}>
                        <ButtonDropdown className="d-table ml-auto mr-0" isOpen={isProfileDropdownOpen}
                                        toggle={toggleProfileDropdown}>
                            <DropdownToggle color="info" caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem disabled>Statistics</DropdownItem>
                                <DropdownItem>My profile</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem><Button className="text-black" onClick={() => props.onLogout()}>Log
                                    out</Button></DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                </React.Fragment>}
            {
                props.location.pathname.includes('login') &&
                <Button className="mx-1" color="info" onClick={toggle}>Sign in</Button>
            }
</Navbar>

)
};

export default withRouter(CustomHorizontalNav)
