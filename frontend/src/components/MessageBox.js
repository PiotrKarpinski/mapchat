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
import {postData} from "./actions";

const MessageBox = (props) => {

    const handleSendMsg = (text) => {
    const msg = {
        id: msgs.length + 1,
        content: text,
        sent: Date.now(),
        getter_id: active
    }
        postData(msg, 'messages', (sent) => {
            msg.sent(sent)
            msgs.push(msg)
            addMsg([...msgs])
        })

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMsg(text)
        }
    }

    const [active, setActive] = useState(1)
    const [msgs, addMsg] = useState([])
    const [text, setText] = useState(null)

    useEffect(() => {

    },[msgs,active]);

    return (
        <Container>
           <Row>
               <Col md={3}>
                   dupa
               </Col>

               <Col md={7}>
                   {/*<Container className="messages-box position-relative">*/}
                   {/*    {msgs.filter(m => (m.poster_id === active && m.getter_id === loggedUserId) || (m.poster_id === loggedUserId && m.getter_id === active)).map(m =>*/}
                   {/*    <Row className="mt-4 text-white"  key={m.id}>*/}
                   {/*        <Col className={m.poster_id === loggedUserId ? 'right' : 'left'}>*/}
                   {/*            {m.content}*/}
                   {/*        </Col>*/}
                   {/*    </Row>*/}
                   {/*    )}*/}
                   {/*    <Row className="position-absolute w-100 bottom-0">*/}
                   {/*        <Col md={10}>*/}
                   {/*            <Input onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>setText(e.target.value)} placeholder="write something..."/>*/}
                   {/*        </Col>*/}
                   {/*        <Col md={2}>*/}
                   {/*            <Button onClick={() => handleSendMsg(text)}><FontAwesomeIcon icon={faFacebookMessenger}/></Button>*/}
                   {/*        </Col>*/}
                   {/*    </Row>*/}
                   {/*</Container>*/}
               </Col>
           </Row>

        </Container>
    )
}

export default MessageBox
