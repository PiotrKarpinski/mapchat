import React, {useEffect, useState} from "react";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

import Modal from "reactstrap/es/Modal";
import ModalBody from "reactstrap/es/ModalBody";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalFooter from "reactstrap/es/ModalFooter";

import {connect} from "react-redux";
import {deleteData} from "../apiActions/DataApi";

const ConfirmModal = (props) => {

    useEffect(() => {

    }, []);

    const onAction = () => {
        deleteData(props.resource.id, 'tasks' ,() => {
            props.reload()
        })
    }

    const {toggle, isOpen} = props

    const type = 'task'

    return (
        <Modal keyboard={true} backdrop={true} toggle={toggle} isOpen={isOpen}>
            <ModalHeader>
                <h1>Confirm {props.action.toUpperCase()}</h1>
            </ModalHeader>
            <ModalBody>
            Are you sure that you want to {props.action.toLowerCase()} the following {props.type}?
            </ModalBody>
            <ModalFooter className="mx-auto">
                <Row>
                    <Col>
                        <Button
                            onClick={() => {
                            onAction()
                        }} color="success">
                            Yes
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


export default connect(mapStateToProps)(ConfirmModal);
