import React, {useEffect, useState} from "react";
import {deleteData, fetchAllData, fetchAllDataByProjectId, postData} from "./actions";
import Card from "reactstrap/es/Card";
import Col from "reactstrap/es/Col";
import {faCalculator, faCalendar, faCircle, faDotCircle, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Row from "reactstrap/es/Row";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";
import CardDeck from "reactstrap/es/CardDeck";
import Task from "./Task";
import DeleteModal from "./ConfirmModal";
import NewTaskModal from "./NewTaskModal";
import NewProjectModal from "./NewProjectModal";
import ConfirmModal from "./ConfirmModal";
import Loader from "react-loader-spinner";
import Container from "reactstrap/es/Container";


const Dashboard = (props) => {

    const reload = () => {
        toggleModal(null)
        fetchAllDataByProjectId('tasks', props.project_id, (result) => {
            setTasks(result)
            setLoading(!result)
        })
    }

    useEffect(() => {
        console.log('test')
        setWidth(props.width)
        reload()
    }, [props.width, props.project_id]);

    const getColor = (id) => {
        let color = ''
        switch (id) {
            case 1:
                color = 'green'
                break;
            case 2:
                color = 'orange'
                break;
            case 3:
                color = 'red'
                break;
            case 4:
                color = 'black'
                break;
        }
        console.log(id)
        return color
    }

    const getStatus = (id) => {
        let status
        switch (id) {
            case 1:
                status = faCalendar
                break;
            case 2:
                status = faCalculator
                break;
            case 3:
                status = faCircle
                break;
            case 4:
                status = faEnvelope
                break;
            case 5:
                status = faDotCircle
        }
        return status
    }

    const toggleModal = (modal) => {
        setModalOpen(modal ? modal : null)
    };

    const [modal, setModalOpen] = useState(null);
    const [tasks, setTasks] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [task, setTask] = useState(null)
    const [width, setWidth] = useState(null)

    return (
        <div>
            {isLoading ?
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
                :
                <CardDeck style={{
                    display: 'inline-flex',
                    width: task ? 70 + '%' : '90%',
                    marginLeft: 90 - width + '%'
                }}>

                    {tasks.map((t, index) =>

                        <Card key={index} outline={task && t.id === task.id}
                              color={task && t.id === task.id && "success"}
                              onClick={() => setTask(t)} className="task-card my-4"
                              style={{width: '16rem', flex: 'none', textAlign: 'left'}}>
                            <CardBody>
                                <CardTitle>{t.full_name}</CardTitle>
                                {/*<Row>*/}
                                {/*    <Col md={2}><FontAwesomeIcon color={getColor(parseInt(t.priority_id))}*/}
                                {/*                                 icon={faCircle}/></Col>*/}
                                {/*    <Col md={2}><FontAwesomeIcon color={'black'}*/}
                                {/*                                 icon={getStatus(parseInt(t.status_id))}/></Col>*/}
                                {/*</Row>*/}
                                <CardText>

                                    <p className="cut-text">{t.description}</p>

                                </CardText>

                            </CardBody>

                        </Card>
                    )}

                </CardDeck>
            }
            {task && <Task closeTask={() => setTask(null)} task={task} openConfirm={toggleModal}/>}
            {modal === 'TASK' &&
            <NewTaskModal
                onSave={(resource) => {
                    console.log(resource)
                    postData(resource, 'tasks', () => {
                        reload();
                        toggleModal(null)
                    })
                }}
                toggle={toggleModal}
                isOpen={modal === 'TASK'}
            />}
            {modal === 'PROJECT' &&
            <NewProjectModal
                onSave={(resource) => {
                    postData(resource, 'projects', () => {
                        console.log(resource)
                        reload();
                        toggleModal(null)
                    })
                }}
                toggle={toggleModal}
                isOpen={modal === 'PROJECT'}
            />}
            {modal === 'DELETE' && <ConfirmModal
                action={modal}
                reload={reload}
                resourceName={'tasks'}
                resource={task}
                toggle={toggleModal}
                isOpen={modal === 'DELETE'}
            />}
        </div>
    )
};

export default Dashboard;
