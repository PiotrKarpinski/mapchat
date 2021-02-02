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


const CustomHorizontalNav = (props) => {

    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen)
    };
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen)
    };


    return (
        <Navbar color="dark">
            <RegisterModal isOpen={isOpen} toggle={toggle}/>
            <Col md={1}>
                <Link className="text-black" to="/"><FontAwesomeIcon color="white" size={24} icon={faAward}/></Link>
            </Col>
            <Col md={2}>
                {
                    !props.location.pathname.includes('login') &&
                    <ButtonDropdown className="d-table" isOpen={isDropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle color="info" caret>
                            Work environment
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><Link className="text-black" to="/dashboard">Board</Link></DropdownItem>
                            <DropdownItem disabled><Link className="text-black" to="/login">Tasks</Link></DropdownItem>
                            <DropdownItem disabled><Link className="text-black" to="/login">Projects</Link></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>}
            </Col>
            <Col md={9}>
                {
                    !props.location.pathname.includes('login') &&
                    <ButtonDropdown className="d-table ml-auto mr-0" isOpen={isDropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle color="info" caret>
                        Profile
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem disabled>Statistics</DropdownItem>
                        <DropdownItem>My profile</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem><Button className="text-black" onClick={() => {
                            logout
                        }}>Log out</Button></DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>}
                {
                    props.location.pathname.includes('login') &&
                    <Button className="mx-1" color="info" onClick={toggle}>Sign in</Button>
                }
            </Col>

        </Navbar>

    )
};

export default withRouter(CustomHorizontalNav)
