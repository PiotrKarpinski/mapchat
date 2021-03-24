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
import {fetchAllData, postData} from "../apiActions/DataApi";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";

const NewTaskModal = (props) => {


    const handleSaveTask = (resource) => {

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveTask(resource)
        }
    }

    const onResource = (valueName,value) => {
        let values = resource
        values[valueName] = value
        setResource({...values})
    }

    useEffect(() => {
        fetchAllData( 'projects', (result) => {
            let data = options
            options.projects = result
            onResource('project_id',result[0].id);
            fetchAllData( 'priorities', (result) => {
                data.priorities = result
                onResource('priority_id',result[0].id);
                fetchAllData( 'statuses', (result) => {
                    data.statuses = result
                    onResource('status_id',result[0].id);
                    setOptions(data)
                })
            })
        })


    }, []);

    const {toggle, isOpen} = props
    const [options, setOptions] = useState({
        priorities: [],
        statuses: [],
        projects: []
    })
    const [resource, setResource] = useState({
        name: '',
        description: '',
        status_id: null,
        priority_id: null,
        project_id: null
    })
    const {projects, priorities, statuses} = options




    return (
        <Modal keyboard={true} backdrop={true} toggle={toggle} isOpen={isOpen}>
            <ModalHeader>
                <h1>
                    New Task
                </h1>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="Name">Name</Label>
                        <Input
                            onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('name', e.target.value)
                        }} type="text" name="text" id="exampleTitle" placeholder="Enter task name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Project">Project</Label>
                        <Input onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('project_id', e.target.value)
                        }} type="select" name="select" id="exampleSelect">
                            {projects.map(p =>
                                <option value={p.id}>{p.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Priority">Priority</Label>
                        <Input onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('priority_id', e.target.value)
                        }} type="select" name="select" id="exampleSelect">
                            {priorities.map(p =>
                                <option value={p.id}>{p.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Status">Current Status</Label>
                        <Input onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('status_id', e.target.value)
                        }} type="select" name="select" id="exampleSelect">
                            {statuses.map(s =>
                                <option value={s.id}>{s.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Description">Know-How(description)</Label>
                        <Input onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('description', e.target.value)
                        }} type="textarea" name="text" id="exampleText"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Attachment">Attachment</Label>
                        <Input onKeyPress={(e) => handleKeyDown(e)} type="file" name="file" id="exampleFile"/>
                        <FormText color="muted">
                            You can store images and movies here
                        </FormText>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"/>{' '}
                            CODE RED PRIORITY
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter className="mx-auto">
                <Row>

                    <Col>

                        <Button onClick={() => props.onSave(resource)} color="success">
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

export default NewTaskModal
