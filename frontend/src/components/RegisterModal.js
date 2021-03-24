import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import Row from "reactstrap/es/Row";
import ModalFooter from "reactstrap/es/ModalFooter";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";
import {Link} from "react-router-dom";
import Modal from "reactstrap/es/Modal";
import React, {useState} from "react";
import {Input, InputGroup,} from "reactstrap/es";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from '@fortawesome/free-solid-svg-icons'

const RegisterModal = (props) => {

    const {toggle, isOpen} = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmed, setPasswordConfirmed] = useState(false)

    return (

        <Modal keyboard={true} backdrop={true} toggle={toggle} isOpen={isOpen}>
            <ModalHeader>
                Create an account
            </ModalHeader>
            <ModalBody className="mx-auto w-75 p-10">
                <Row>
                    <InputGroup className="py-2">
                        <Input
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your email"/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="py-2">

                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"/>
                    </InputGroup>
                </Row>
                {password && <Row>
                    <InputGroup className="py-2">

                        <Input
                            onChange={(e) => setPasswordConfirmed(e.target.value === password)}
                            placeholder="One more time"/>
                    </InputGroup>
                </Row>}
            </ModalBody>
            <ModalFooter className="mx-auto" >
                <Row>
                    <Col>
                        <Button onClick={() => {
                            if (passwordConfirmed) {
                                props.onSignup({username, password})
                                toggle()
                            }
                        }} color="success">
                            Register
                        </Button>
                    </Col>
                    <Col>
                        <Button color="danger" className="float-lg-right" onClick={toggle}>Cancel</Button>
                    </Col>
                </Row>
            </ModalFooter>
        </Modal>


    )
}

export default RegisterModal;

