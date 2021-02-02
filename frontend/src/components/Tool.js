import React from "react";
import Container from "reactstrap/es/Container";
import Jumbotron from "reactstrap/es/Jumbotron";
import {useParams} from "react-router-dom";

const Tool = () => {

    let {id} = useParams()

    return (
        <Container>
            <Jumbotron>
                Tool {id} not yet ready
            </Jumbotron>
        </Container>
    )
}

export default Tool