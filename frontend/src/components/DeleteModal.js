import React, {useEffect, useState} from "react";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

import Modal from "reactstrap/es/Modal";
import ModalBody from "reactstrap/es/ModalBody";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalFooter from "reactstrap/es/ModalFooter";

import {connect} from "react-redux";

const DeleteModal = (props) => {




    useEffect(() => {

    }, []);


    const {toggle, isOpen} = props

    const type = 'task'
    const names = 'th-dupsko, th-chujnia, wt-piwsko'

    return (
        <Modal keyboard={true} backdrop={true} toggle={toggle} isOpen={isOpen}>
            <ModalHeader>
                <h1>Delete {type}: {names}</h1>
            </ModalHeader>
            <ModalBody>
            Are you sure that you want to delete the following {type}?
                {names}
            </ModalBody>
            <ModalFooter className="mx-auto">
                <Row>
                    <Col>
                        <Button
                            onClick={() => {
                            props.onDelete(props.resource)
                        }} color="danger">
                            Delete
                        </Button>
                    </Col>
                    <Col>
                        <Button color="warning" className="float-lg-right" onClick={toggle}>Cancel</Button>
                    </Col>
                </Row>
            </ModalFooter></Modal>

    )
}

const mapStateToProps = state => {
    return { selected: state.selected };
};


export default connect(mapStateToProps)(DeleteModal);
