import React, {useEffect, useState} from "react";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import Modal from "reactstrap/es/Modal";
import ModalBody from "reactstrap/es/ModalBody";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalFooter from "reactstrap/es/ModalFooter";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Resources} from "../common/Resources"


const NewProjectModal = (props) => {




    const onResource = (valueName,value) => {
        let data
        data = {...resource, [valueName]:value}
        setResource(data)
    }

    useEffect(() => {

    }, []);

    const generatePrefix = (resource) => {
        const name = resource.name.toUpperCase()
        const array = name.trim().split(' ');
        const prefix = array.map((word) => word[0]).join('')
        onResource('prefix',prefix)
    }

    const {toggle, isOpen} = props
    const [resource, setResource] = useState({
        name: null,
        prefix: null
    })




    return (
        <Modal keyboard={true} backdrop={true} toggle={toggle} isOpen={isOpen}>
            <ModalHeader>
                <h1>
                    New project
                </h1>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="Name">Name</Label>
                        <Input
                            onChange={(e) => {
                            onResource('name', e.target.value)
                            }} type="text" name="text" placeholder="Enter project name"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Status">Current Status</Label>
                        <Input onChange={(e) => {
                            onResource('status_id', e.target.value)
                        }} type="select" name="select" id="exampleSelect">
                            {Resources.categories.map(s =>
                                <option value={s.value}>{s.label}</option>
                            )}
                        </Input>
                    </FormGroup>
                    {resource.prefix &&
                    <FormGroup>
                        <Label for="Prefix">Prefix</Label>
                        <Input
                            value={resource.prefix}
                            onChange={(e) => {
                                onResource('prefix', e.target.value)
                            }} type="text" name="text" placeholder="Enter prefix"/>
                    </FormGroup>
                    }
                    <FormGroup>
                        <Button
                            disabled={resource.prefix !== null || resource.name === null}
                            onClick={() => {
                                generatePrefix(resource)
                            }} color="light">
                            Generate prefix
                        </Button><br/>

                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter className="mx-auto">
                <Row>

                    <Col>

                        <Button
                            disabled={resource.prefix === null}
                            onClick={() => {
                            props.onSave(resource)
                        }} color="success">
                            Save
                        </Button>
                    </Col>
                    <Col>
                        <Button color="danger" className="float-lg-right" onClick={toggle}>Cancel</Button>
                    </Col>
                </Row>
            </ModalFooter></Modal>

    )
}

export default NewProjectModal
