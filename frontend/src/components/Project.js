import React, {useEffect, useState} from "react";
import Container from "reactstrap/es/Container";
import Jumbotron from "reactstrap/es/Jumbotron";
import {useParams} from "react-router-dom";
import {fetchAllData, fetchData} from "../apiActions/DataApi";
import Loader from "react-loader-spinner";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import CardLink from "reactstrap/es/CardLink";
import CardFooter from "reactstrap/es/CardFooter";

const Project = () => {

    let {id} = useParams()
    const reload = () => {
        //WE NEED TO MAKE ONE FETCH FUNCTION TO LOAD ARRAY OF STRINGS
        //WE CANT NEST CALLBACKS
        fetchData(id,'tasks', (result) => {
            setTasks(result)})
        fetchData(id,'projects', (result) => {
            setProject(result)
            setLoading(!result)
        })
    }

    useEffect(() => {
        reload()
    }, []);
    const [project, setProject] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])

    return (
        <Container>
            {isLoading ? <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs

                />
                :
                <div>
                    <Jumbotron>
                        {project.NAME}
                    </Jumbotron>
                    <Row>
                        <Col md={6}>
                            <h5>Collaborators:</h5>
                        </Col>
                        <Col md={6}>
                            <h5>Tasks:</h5>
                            {tasks.map(t =>
                                <Card>
                                    <CardHeader>{project.PREFIX + '-' + t.NAME}</CardHeader>
                                    <Row>
                                        <Col>{t.ID_PRIORITY}</Col>
                                        <Col>{t.ID_STATUS}</Col>
                                        <Col>{t.DATE_CREATED}</Col>
                                    </Row>
                                    <CardLink>{t.DATE_CREATED}</CardLink>
                                    <CardFooter>User assigned:</CardFooter>
                                </Card>

                                )}
                        </Col>
                    </Row>
                    <h5>Collaborators:</h5>
                </div>}
        </Container>
    )
}

export default Project
