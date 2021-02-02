import React, {useEffect, useState} from "react";
import {fetchAllData} from "./actions";
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


const Dashboard = (props) => {

    const reload = () => {
        if (props.loggedIn) {
            console.log('test')
            //WE NEED TO MAKE ONE FETCH FUNCTION TO LOAD ARRAY OF STRINGS
            //WE CANT NEST CALLBACKS
            fetchAllData('tasks', (result) => {
                setTasks(result)
                fetchAllData('projects', (result) => {
                    console.log(projects, isLoading)
                    setProjects(result)
                    setLoading(!result)

                })
            })
        } else {
            debugger
        }

    }


    useEffect(() => {
        console.log('test')
        setWidth(props.width)
        reload()
    }, [props]);

    const getPrefix = (id) => {
        console.log(projects)
        return projects.find(p => p.ID === id).PREFIX
    }


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


    const [tasks, setTasks] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [task, setTask] = useState(null)
    const [width, setWidth] = useState(null)

    return (
        <div>
            {!isLoading &&
            <CardDeck style={{
                display: 'inline-flex',
                width: task ? width - 20 + '%' : width + '%',
                marginLeft: 90 - width + '%'
            }}>
                {tasks.map((t, index) =>

                    <Card key={index} outline={task && t.ID === task.ID} color={task && t.ID === task.ID && "success"}
                          onClick={() => setTask(t)} className="task-card my-4"
                          style={{width: '16rem', flex: 'none', textAlign: 'left'}}>
                        <CardBody>
                            <CardTitle>{getPrefix(t.ID_PROJECT) + '-' + t.NAME}</CardTitle>
                            <Row>
                                <Col md={2}><FontAwesomeIcon color={getColor(parseInt(t.ID_PRIORITY))} icon={faCircle}/></Col>
                                <Col md={2}><FontAwesomeIcon color={'black'}
                                                             icon={getStatus(parseInt(t.ID_STATUS))}/></Col>
                            </Row>
                            <CardText>

                                <p className="cut-text">{t.DESCRIPTION}</p>

                            </CardText>

                        </CardBody>


                    </Card>
                )}
                {/*{tasks.map((t, index) =>*/}
                {/*        <Card key={index} style={{width: '18rem'}}>*/}
                {/*            <Card.Body>*/}
                {/*                <Card.Title>{getPrefix(t.ID_PROJECT) + '-' + t.NAME}</Card.Title>*/}
                {/*                <Row>*/}
                {/*                    <Col><FontAwesomeIcon color={getColor(t.ID_PRIORITY)} icon={faCircle}/></Col>*/}
                {/*                    <Col><FontAwesomeIcon color={'black'} icon={getStatus(t.ID_STATUS)}/></Col>*/}
                {/*                </Row>*/}
                {/*                <Card.Text>*/}
                {/*                    {t.DESCRIPTION}*/}
                {/*                </Card.Text>*/}
                {/*            </Card.Body>*/}
                {/*        </Card>*/}
                {/*            )}*/}
            </CardDeck>
            }
            {task && <Task closeTask={() => setTask(null)} task={task}/>}

        </div>
    )
};

export default Dashboard;
