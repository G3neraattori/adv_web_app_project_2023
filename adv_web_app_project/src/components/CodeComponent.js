import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'; //for easy date formatting

//This lists the codes and allows submitting.
const CodeComponent = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem('jwtToken');
    const [codeText, setText] = useState('');
    const [comment, setComment] = useState('');
    const [codes, setCodes] = useState([]);

    // Submit the code to the backend
    const handleSubmit = async (event) => {
        try {
            const response = await fetch('http://localhost:5000/code/newcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ text: codeText, user })
            });
            if (response.ok) {
                setText('');
                fetchCode();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Submit the comment to the backend
    const handleCommentSubmit = async (event, codeId) => {
        try {
            const response = await fetch(`http://localhost:5000/code/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({ comment, user, codeId })
            });
            if (response.ok) {
                setText('');
                fetchCode();
            }
        } catch (error) {
            console.error(error);
        }
    };

    //fetch all codes and comments
    const fetchCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/code/all');
            if (response.ok) {
                const data = await response.json();
                console.log(data.data)
                setCodes(data.data);
                console.log(codes)
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchCode();
    }, []);

    return (
        <Container class="d-grid gap-3">
            <Row>
            {!sessionStorage.getItem('jwtToken') && <p style={{paddingTop: "1vh"}}>Login to post</p>}
            {sessionStorage.getItem('jwtToken') && (
                <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Label>Write your code:</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={5}
                        value={codeText}
                        style={{whiteSpace: "pre"}}
                        onChange={(event) => setText(event.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>)}
            </Row>
            <hr/>
            <Row>
            <ListGroup >
            <ListGroup.Item variant="primary">Code board:</ListGroup.Item>
                {Array.from(codes).map((codeText) => (
                <Card>
                <Card.Header className="text-start">{format(new Date(codeText.dateCreated), 'dd/MM/yyyy HH:mm')}- {codeText.author} posted a code snippet:</Card.Header>
                    <ListGroup.Item key={codeText._id}>
                    <Card.Body>
                        <blockquote className="blockquote mb-0 text-start" style={{whiteSpace: "pre-wrap"}}>
                            {codeText.code}
                        </blockquote>
                    </Card.Body>
                    <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments</Accordion.Header>
                    <Accordion.Body className="text-start">
                        {codeText.comments && codeText.comments.length > 0 && (

                            <ListGroup className="mt-3" variant="flush">
                                {Array.from(codeText.comments).map((comment) => (
                                    <ListGroup.Item key={comment._id}>
                                        <Card><Card.Header>({format(new Date(comment.dateCreated), 'dd/MM/yyyy HH:mm')}) {comment.author} commented:</Card.Header>
                                            <Card.Body style={{whiteSpace: "pre-wrap"}}>{comment.text}</Card.Body>
                                        </Card>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    {!sessionStorage.getItem('jwtToken') && <p style={{paddingTop: "1vh"}}>Login to comment</p>}
                    {sessionStorage.getItem('jwtToken') && (
                            <Form onSubmit={(event) => handleCommentSubmit(event, codeText._id)} >
                                <Form.Group className="mt-3">
                                    <Form.Control
                                        required
                                        type="codeText"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit">Comment</Button>
                            </Form>
                    )}
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    </ListGroup.Item>


                </Card>
                    ))}
            </ListGroup>
            </Row>
        </Container>
    );
};

CodeComponent.propTypes = {};

CodeComponent.defaultProps = {};

export default CodeComponent;
