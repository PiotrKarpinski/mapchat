import React from "react";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBehance, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons'
import Container from "reactstrap/es/Container";


const Footer = () => {
    return (
        <Container fluid>
            <Row className="py-3 bg-dark fixed-bottom align-content-start">

                <Col lg={4} className="float-left">
                    <a className="mr-4" href="#">Copyright by AeroSoft 2020</a>

                </Col>
                <Col className="mx-auto" lg={4}>
                    <a className="mx-2" href="#">
                        <FontAwesomeIcon icon={faFacebook}/>
                    </a>
                    <a className="mx-2" href="#">
                        <FontAwesomeIcon icon={faBehance}/>
                    </a>
                    <a className="mx-2" href="#">
                        <FontAwesomeIcon icon={faTwitter}/>
                    </a>
                </Col>

                <Col className="float-right" lg={4}>
                    <a className="mx-3" href="#">Terms and conditions</a>
                    <a className="mx-3" href="#">aerosoft@support.com</a>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;