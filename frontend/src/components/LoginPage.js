import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Container, FormGroup, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap/es";
import Row from "reactstrap/es/Row";
import Button from "reactstrap/es/Button";
import RegisterModal from "./RegisterModal";


const LoginPage = (props) => {

    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen)
    };

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return (
        <Container className="login-box w-25 bg-white p-lg-5 shadow position-absolute centered-box">
            <RegisterModal onSignup={props.onSignup} isOpen={isOpen} toggle={toggle}/>
            <Form>
                <FormGroup>
                    <Row>
                        <InputGroup className="py-2">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>username</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="username"

                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username here"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup className="py-2">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>password</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"/>
                        </InputGroup>
                    </Row>
                    <Row className="mt-3 align-items-md-center justify-content-center">
                        <Button onClick={() => props.onLogin({username, password})} color="info" className="mx-3">
                            Login
                        </Button>
                        or
                        <Button color="info" className="mx-3" onClick={() => setOpen(true)}>Create an account</Button>

                    </Row>
                </FormGroup>
            </Form>
        </Container>

    )
};

export default LoginPage;
