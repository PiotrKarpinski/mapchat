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

const ref = React.createRef();

class Dashboard extends React.Component {

    state = {
        modal: null,
        task: null,
        tasks: null,
        loading: true
    }

    reload = (id) => {
        this.toggleModal(null)
        fetchAllDataByProjectId('tasks', id, (tasks) => {
            this.setState({tasks, loading: false})
        })
    }

    componentDidMount = () => {
        this.setState({width: this.props.width})
        this.reload()
    };

    componentWillReceiveProps = (nextProps, nextContext) => {
        // Any time props.project_id changes, update state.
        if (nextProps.project_id !== this.props.project_id) {
            this.reload(nextProps.project_id)
        }
    }

    toggleModal = (modal) => {
        this.setState({modal: modal ? modal : null})
    };

    render() {
        const {modal, tasks, task, loading, width} = this.state

        return (

            <div> {!loading &&
            <CardDeck style={{
                display: 'inline-flex',
                width: task ? width - 20 + '%' : width + '%', marginLeft: 90 - width + '%'
            }}>{tasks.map((t, index) =>
                <Card key={index} outline={task && t.id === task.id}
                      color={task && t.id === task.id && "success"}
                      onClick={() => this.setState({task: t})} className="task-card my-4"
                      style={{width: '16rem', flex: 'none', textAlign: 'left'}}>
                    <CardBody>
                        <CardTitle>{t.full_name}</CardTitle>
                        {/*TODO: ADD COLOR AND ICON TO PRIOR AND STATUS*/}
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
            </CardDeck>}

                {task &&
                <Task ref={ref} closeTask={() => this.setState({task: null})} task={task} openConfirm={this.toggleModal}/>}
                {modal === 'TASK' &&
                <NewTaskModal
                    onSave={(resource) => {
                        postData(resource, 'tasks', () => {
                            this.reload();
                            this.toggleModal(null)
                        })
                    }}
                    toggle={this.toggleModal}
                    isOpen={modal === 'TASK'}
                />}
                {
                    modal === 'PROJECT' &&
                    <NewProjectModal
                        onSave={(resource) => {
                            postData(resource, 'projects', () => {
                                console.log(resource)
                                this.reload();
                                this.toggleModal(null)
                            })
                        }}
                        toggle={this.toggleModal}
                        isOpen={modal === 'PROJECT'}
                    />
                }
                {
                    modal === 'DELETE' && <ConfirmModal
                        action={modal}
                        reload={this.reload}
                        resourceName={'tasks'}
                        resource={task}
                        toggle={this.toggleModal}
                        isOpen={modal === 'DELETE'}
                    />
                }
            </div>
        )
    }
}
;

export default Dashboard;
