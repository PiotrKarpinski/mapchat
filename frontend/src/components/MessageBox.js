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
import {fetchAllData, postData} from "./actions";

const MessageBox = (props) => {

    useEffect(() => {
        fetchAllData('messages', (data) => {
            addMsg(...data)
        })
    },[props]);

    const handleSendMsg = (text) => {
    const msg = {
        content: text,
        getter_id: active,
        read: false
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

    return (
        <Container>
           <Row>
               <Col md={12}>
                   <Container className="messages-box position-relative">
                       {msgs.length > 0 && msgs.filter.map(m =>
                       <Row className="mt-4 text-white"  key={m.id}>
                           <Col className={m.poster_id === 1 ? 'right' : 'left'}>
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

export default MessageBox
