import React, {useState, useEffect} from "react";
import Container from "reactstrap/es/Container";
import Jumbotron from "reactstrap/es/Jumbotron";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Navbar from "reactstrap/es/Navbar";
import NavItem from "reactstrap/es/NavItem";
import Button from "reactstrap/es/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faAward,
    faBuilding,
    faCalendarAlt,
    faCircle,
    faPaintRoller
} from "@fortawesome/free-solid-svg-icons";
import Nav from "reactstrap/es/Nav";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import {faFacebookMessenger} from "@fortawesome/free-brands-svg-icons";

const Assembly = () => {

const users = [
    {
        id:0,
        name: 'Piotr',
        surname: 'Karpinski',
        active: true,
    },
    {
        id:1,
        name: 'Bartlomiej',
        surname: 'Karpinski',
        active: true,
    },
    {
        id:2,
        name: 'Janusz',
        surname: 'Kowalski',
        active: false,
    },
    ]

    const messages = [
        {
            id: 0,
            content: 'ahahagas2222hgajfadjdhgsd',
            sent: Date.now() - 20500,
            poster_id: 0,
            getter_id: 1
        },
        {
            id: 1,
            content: 'a22222222223311hahagashgajfadjdhgsd',
            sent: Date.now() - 2000,
            poster_id: 0,
            getter_id: 1
        },
        {
            id: 2,
            content: 'ahahag    ashgajfadjdhgsd',
            sent: Date.now() - 2100,
            poster_id: 2,
            getter_id: 0
        },
        {
            id: 3,
            content: 'witaj jestem janusz',
            sent: Date.now() - 200,
            poster_id: 2,
            getter_id: 0
        },
        {
            id: 4,
            content: 'siema jestem piotr',
            sent: Date.now() - 200011110,
            poster_id: 0,
            getter_id: 2
        },
        {
            id: 5,
            content: 'ahahagashgajaaaaaaaaaaaaafadjdhgsd',
            sent: Date.now() - 202000,
            poster_id: 0,
            getter_id: 1
        },
        {
            id: 6,
            content: 'ahahagashgsdasssssssssssajfadjdhgsd',
            sent: Date.now() - 2001100,
            poster_id: 2,
            getter_id: 0
        }

    ]

    const handleSendMsg = (text) => {
    const msg = {
        id: msgs.length + 1,
        content: text,
        sent: Date.now(),
        poster_id: loggedUserId,
        getter_id: active
    }
    console.log(msg)
        msgs.push(msg)
        addMsg([...msgs])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMsg(text)
        }
    }

    const [active, setActive] = useState(1)
    const [msgs, addMsg] = useState(messages)
    const [text, setText] = useState(null)

    useEffect(() => {

    },[msgs,active]);

    const loggedUserId = 0

    return (
        <Container>
           <Row>
               <Col md={3}>
                   <Nav vertical>
                       {users.filter(u => u.id !== loggedUserId).map(u =>
                           <NavItem>
                           <Button key={u.id} onClick={() => setActive(u.id)}><FontAwesomeIcon color={u.active ? "green" : "red"} icon={faCircle}/> {u.name + '' + u.surname}</Button>
                           </NavItem>
                           )}
                   </Nav>
               </Col>

               <Col md={7}>
                   <Container className="messages-box position-relative">
                       {msgs.filter(m => (m.poster_id === active && m.getter_id === loggedUserId) || (m.poster_id === loggedUserId && m.getter_id === active)).map(m =>
                       <Row className="mt-4 text-white"  key={m.id}>
                           <Col className={m.poster_id === loggedUserId ? 'right' : 'left'}>
                               {m.content}
                           </Col>
                       </Row>
                       )}
                       <Row className="position-absolute w-100 bottom-0">
                           <Col md={10}>
                               <Input onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>setText(e.target.value)} placeholder="write something..."/>
                           </Col>
                           <Col md={2}>
                               <Button onClick={() => handleSendMsg(text)}><FontAwesomeIcon icon={faFacebookMessenger}/></Button>
                           </Col>
                       </Row>
                   </Container>
               </Col>
           </Row>

        </Container>
    )
}

export default Assembly