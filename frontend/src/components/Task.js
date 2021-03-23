import React, {useEffect, useRef, useState} from "react";
import Container from "reactstrap/es/Container";
import {useParams} from "react-router-dom";
import {fetchAllData, fetchData, fetchSelectData, postData, updateData} from "./actions";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import Loader from 'react-loader-spinner'
import {Col, Row} from "reactstrap";


const Task = React.forwardRef((props, ref)=> {

    let {id} = useParams()


    useEffect(() => {

        document.addEventListener('click', handleClickOutside, true);
        getTask(props.task)
        const selectsArray = ['priorities', 'statuses']
        fetchSelectData(selectsArray, (result) => {
            const data = options
            data.priorities = result.priorities
            data.statuses = result.statuses
            setOptions(data)
            setLoading(!result)
        })
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [id, props]);

    const handleSaveTask = (resource) => {
        updateData(resource, 'tasks', () => {
            console.log('updated')
        })
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            props.closeTask()
        }
    };

    const handleKeyDown = (e) => {
        console.log(e)
        if (e.key === 'Enter') {
            handleSaveTask(resource)
        }
    }


    const onResource = (valueName, value) => {
        let values = resource
        values[valueName] = value
        setResource({...values})
    }

    const getLabelFromId = (array, id) => {
        return array.find(a => a.id === id).id
    }

    const [isLoading, setLoading] = useState(true)
    const [editing, setEditing] = useState(null)
    const [resource, setResource] = useState({
        name: '',
        description: '',
        status_id: null,
        priority_id: null,
    })
    const [options, setOptions] = useState({
        priorities: [],
        statuses: []
    })
    const [task, getTask] = useState(null) //Hook - nie wiem co to jeszcze


    return (
        <Container ref={ref} className="task-container">
            {isLoading ? <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs

                />
                :
                <div>
                    <Row>
                        <Col md={8}>
                            <Input
                                onClick={() => setEditing('name')}
                                onBlur={() => setEditing(null)}
                                className={editing === 'name' ? 'task-editing' : 'task-present'}
                                value={task.name} onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                                onResource('name', e.target.value)
                            }} placeholder="Enter task name"/>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label className="task-label" for="Priority">Priority</Label>
                        <Input
                            className={editing === 'priority_id' ? 'task-editing' : 'task-present'}
                            onClick={() => setEditing('priority_id')}
                            onBlur={() => setEditing(null)}
                            onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('priority_id', e.target.value)
                        }} type="select">
                            {options.priorities.map(p =>
                                <option selected={p.id === task.priority_id} value={p.id}>{p.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="task-label" for="Status">Current Status</Label>
                        <Input
                            className={editing === 'status_id' ? 'task-editing' : 'task-present'}
                            onClick={() => setEditing('status_id')}
                            onBlur={() => setEditing(null)}
                            onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('status_id', e.target.value)
                        }} type="select">
                            {options.statuses.map(s =>
                                <option selected={s.id === task.status_id} value={s.id}>{s.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="task-label" for="Description">Know-How(description)</Label>
                        <Input
                            value={task.description}
                            className={editing === 'description' ? 'task-editing' : 'task-present'}
                            onClick={() => setEditing('description')}
                            onBlur={() => setEditing(null)}
                            onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('description', e.target.value)
                        }} type="textarea" name="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="task-label" for="attachment">Attachment</Label>
                        <Input onKeyPress={(e) => handleKeyDown(e)} type="file" name="file" id="exampleFile"/>
                        <FormText color="muted">
                            You can upload images and videos here
                        </FormText>
                    </FormGroup>

                    <FormGroup check>
                        <Label className="task-label" check>
                            <Input type="checkbox"/>{' '}
                            CODE RED PRIORITY
                        </Label>
                    </FormGroup>
                </div>
            }
        </Container>
    )
})


export default Task;
