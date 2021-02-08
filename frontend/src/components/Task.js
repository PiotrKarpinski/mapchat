import React, {useEffect, useState} from "react";
import Container from "reactstrap/es/Container";
import {useParams} from "react-router-dom";
import {fetchAllData, fetchData, postData, updateData} from "./actions";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import {Resources} from "../common/Resources"
import Loader from 'react-loader-spinner'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const Task = (props) => {

    let {id} = useParams()


    useEffect(() => {
        if (props.task) {
            getTask(props.task)
        } else {
            fetchData(id, 'tasks', (result) => {
                getTask(result)
            })
        }

        fetchAllData( 'projects', (result) => {
            let data = options
            options.projects = result
            fetchAllData( 'priorities', (result) => {
                data.priorities = result
                fetchAllData( 'statuses', (result) => {
                    data.statuses = result
                    setOptions(data)
                    setLoading(!result)
                })
            })
        })


    }, [id, props]);

    const handleSaveTask = (resource) => {
        updateData(resource, 'tasks', () => {
            console.log('updated')
        })
    }

    const handleKeyDown = (e) => {
        console.log(e)
        if (e.key === 'Enter') {
            handleSaveTask(resource)
        }
    }

    const [options, setOptions] = useState({
        priorities: [],
        statuses: [],
        projects: []
    })
    const onResource = (valueName, value) => {
        let values = resource
        values[valueName] = value
        setResource({...values})
    }

    const getLabelFromId = (array, id) => {
        return array.find(a => a.id === id).id
    }

    const [isLoading, setLoading] = useState(true)
    const {priorities, statuses, projects} = options
    const [editing, setEditing] = useState(null)
    const [resource, setResource] = useState({
        name: '',
        description: '',
        status_id: null,
        priority_id: null,
        project_id: null
    })
    const [task, getTask] = useState(null) //Hook - nie wiem co to jeszcze


    return (


        <Container className="task-container">
            {isLoading ? <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs

                />
                :
                <div>
                    <FontAwesomeIcon icon={faTimes} onClick={props.closeTask}/>
                        <FormGroup>
                            <Label className="task-label" for="Name">Name</Label>
                            <Input
                                onClick={() => setEditing('name')}
                                onBlur={() => setEditing(null)}
                                className={editing === 'name' ? 'task-editing' : 'task-present'}
                                value={task.name} onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                                onResource('name', e.target.value)
                            }} placeholder="Enter task name"/>
                        </FormGroup>

                    <FormGroup>
                        <Label className="task-label" for="Project">Project</Label>
                        <Input
                            onClick={() => setEditing('project_id')}
                            onBlur={() => setEditing(null)}
                            className={editing === 'project_id' ? 'task-editing' : 'task-present'}
                            onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('project_id', e.target.value)
                        }} type="select">
                            {projects.map(p =>
                                <option selected={p.id === task.project_id} value={p.id}>{p.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="task-label" for="Priority">Priority</Label>
                        <Input
                            className={editing === 'priority_id' ? 'task-editing' : 'task-present'}
                            onClick={() => setEditing('priority_id')}
                            onBlur={() => setEditing(null)}
                            onKeyPress={(e) => handleKeyDown(e)} onChange={(e) => {
                            onResource('priority_id', e.target.value)
                        }} type="select">
                            {priorities.map(p =>
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
                        }} type="select" >
                            {statuses.map(s =>
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
}


export default Task;
