import React, {useEffect, useState} from "react";
import Nav from "reactstrap/es/Nav";
import NavItem from "reactstrap/es/NavItem";
import Collapse from "./Collapse";
import Button from "reactstrap/es/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faAward, faBuilding, faCalendarAlt, faPaintRoller} from "@fortawesome/free-solid-svg-icons";
import {Link, withRouter} from "react-router-dom";
import NewTaskModal from "./NewTaskModal";
import NewProjectModal from "./NewProjectModal";
import {fetchAllData, postData} from "../apiActions/DataApi";
import Loader from 'react-loader-spinner';


const CustomVerticalNav = (props) => {


    const reload = () => {
        //WE NEED TO MAKE ONE FETCH FUNCTION TO LOAD ARRAY OF STRINGS
        //WE CANT NEST CALLBACKS
        fetchAllData('tasks', (result) => {
            setTasks(result)
            fetchAllData('projects', (result) => {
                setProjects(result)
                setLoading(!result)
            })
        })
    }

    useEffect(() => {
        reload()
    }, []);

    const [tasks, setTasks] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [projects, setProjects] = useState([])

    const [modal, setModalOpen] = useState(null);

    const toggleModal = (modal) => {
        setModalOpen(modal ? modal : null)
    };

    const [tab, setTabOpen] = useState(null);
    const toggleTab = (t) => {
        if (t !== tab)  {
            props.setWidth(2)
            setTabOpen(t)
            } else {
            props.setWidth(1)
            setTabOpen(null)
        }

    };
    const getPrefix = (id) => {
        console.log(projects)
        return projects.find(p => p.ID === id).PREFIX
    }

    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen)
        props.setWidth(isOpen ? 0 : 1)

    };

    let url = props.match.url

    if (!props.location.pathname.includes('/login')) {
        return (

            <React.Fragment>
                <Nav className="float-left vertical-nav text-left" vertical>
                    <NavItem>
                        <Button onClick={toggle}><FontAwesomeIcon icon={faBuilding}/></Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={toggle}><FontAwesomeIcon icon={faAddressBook}/></Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={toggle}><FontAwesomeIcon icon={faAward}/></Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={toggle}><FontAwesomeIcon icon={faCalendarAlt}/></Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={toggle}><FontAwesomeIcon icon={faPaintRoller}/></Button>
                    </NavItem>
                </Nav>
                <Collapse style={{left: 41 + 'px', position: "absolute"}} isOpen={isOpen} vertical={false}
                          elementMaxLength={'400px'}>
                    <Nav className="vertical-nav bg-dark-grey text-left" vertical>
                        <NavItem>
                            <Link onClick={() => toggleTab(null)} className="nav-link" to={`${url}assembly`}>Assembly
                                chat</Link>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => toggleTab('tasks')}>My tasks</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => toggleTab('projects')}>Projects</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => toggleTab('tools')}>Active Tools</Button>
                        </NavItem>
                        <NavItem>
                            <Link onClick={() => toggleTab(null)} className="nav-link"
                                  to={`${url}storage`}>Storage</Link>
                        </NavItem>
                    </Nav>
                    {isLoading ? <Loader
                            type="Aduio"
                            color="#00BFFF"
                            height={100}
                            width={70}
                            timeout={3000} //3 secs

                        />
                        :
                        <Collapse isOpen={tab === 'tasks'} vertical={false} elementMaxLength={'400px'}>
                            <Nav className="vertical-nav bg-dark text-left" vertical>
                                <NavItem>
                                    <Button onClick={() => toggleModal('TASK')}>Create new task</Button>
                                </NavItem>
                                {tasks.map((t, index) =>
                                    <NavItem key={index}>
                                        <Link className="nav-link"
                                              to={`${url}tasks/${t.ID}`}>{getPrefix(t.ID_PROJECT) + '-' + t.NAME}</Link>
                                    </NavItem>)}
                            </Nav>
                        </Collapse>
                    }
                    {isLoading ? <Loader
                            type="Audio"
                            color="#00BFFF"
                            height={100}
                            width={70}
                            timeout={3000} //3 secs

                        />
                        :
                        <Collapse isOpen={tab === 'projects'} vertical={false} elementMaxLength={'400px'}>
                            <Nav className="vertical-nav bg-dark text-left" vertical>
                                <NavItem>
                                    <Button onClick={() => toggleModal('PROJECT')}>Create new project</Button>
                                </NavItem>
                                {projects.map((p, index) =>
                                    <NavItem key={index}>
                                        <Link className="nav-link" to={`${url}projects/${p.ID}`}>{p.NAME}</Link>
                                    </NavItem>)}
                            </Nav>
                        </Collapse>
                    }


                </Collapse>
                {modal === 'TASK' &&
                <NewTaskModal
                    onSave={(resource) => {
                        console.log(resource)
                        postData(resource, 'tasks' ,() => {
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
                        postData(resource, 'projects' ,() => {
                            console.log(resource)
                            reload();
                            toggleModal(null)
                        })
                    }}
                    toggle={toggleModal}
                    isOpen={modal === 'PROJECT'}
                />}


            </React.Fragment>
        )
    }
    return null

}

export default withRouter(CustomVerticalNav);
