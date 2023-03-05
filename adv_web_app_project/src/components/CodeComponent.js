import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const CodeComponent = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem('jwtToken');
    const [text, setText] = useState('');
    const [comment, setComment] = useState('');
    const [texts, setTexts] = useState([]);

    // Function to submit the text to the backend
    const handleSubmit = async (event) => {
        try {
            const response = await fetch('http://localhost:5000/code/newcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ text, user })
            });
            if (response.ok) {
                setText('');
                fetchCode();
            }
        } catch (error) {
            console.error(error);
        }
    };
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

    const fetchCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/code/all');
            if (response.ok) {
                const data = await response.json();
                console.log(data.data)
                setTexts(data.data);
                console.log(texts)
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
            {sessionStorage.getItem('jwtToken') && (
                <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Label>Write your code:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={text}
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
                {Array.from(texts).map((text) => (
                <Card>
                <Card.Header>{text.author} posted a code:</Card.Header>


                    <ListGroup.Item key={text._id}>
                    <Card.Body>
                        <blockquote className="blockquote mb-0 text-start">
                            {text.code}
                        </blockquote>
                    </Card.Body>
                    <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments</Accordion.Header>
                    <Accordion.Body>
                        {text.comments && text.comments.length > 0 && (

                            <ListGroup className="mt-3" variant="flush">
                                {Array.from(text.comments).map((comment) => (
                                    <ListGroup.Item key={comment._id}>
                                        <Card><Card.Header>{comment.author} - {comment.dateCreated}</Card.Header>
                                            <Card.Body>{comment.text}</Card.Body>
                                        </Card>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    {sessionStorage.getItem('jwtToken') && (
                            <Form onSubmit={(event) => handleCommentSubmit(event, text._id)}>
                                <Form.Group className="mt-3">
                                    <Form.Control
                                        type="text"
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
