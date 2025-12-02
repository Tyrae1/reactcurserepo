import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    ButtonGroup,
    ListGroup,
    Badge,
    ButtonToolbar,
    FormControl,
    ListGroupItem
} from 'react-bootstrap';
import {Formik, Form as FormikForm, Field} from 'formik';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, toggleTodo, deleteTodo, clearCompleted} from "./store.js";
import TodoItem from './Components/TodoItem.jsx'

function App() {

    const todos = useSelector(state => state.todoState.todos);
    const [filter, setFilter] = useState('all');
    const dispatch = useDispatch();
    const totalCount = todos.length;
    const completedCount = todos.filter(t => t.completed).length;
    const hasCompleted = completedCount > 0;

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };
    const handleClearCompleted = () => {
        dispatch(clearCompleted());
    };
  return (
    <div className="py-4 bg-light min-vh-100">
    <Container>
        <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} lg={6}>
                <h1 className="text-center mb-3">Todo List (HW11)</h1>
            </Col>
        </Row>

        <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} lg={6}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-3">Add new task</Card.Title>

                        <Formik
                            initialValues={{title: ""}}
                            onSubmit={(values, actions) => {
                                console.log("SUBMIT:", values);
                                const newTodo = {
                                    id: Date.now(),
                                    title: values.title.trim(),
                                    completed: false,
                                };
                                if (!newTodo.title) {
                                    return;
                                }
                                dispatch(addTodo(newTodo));
                                actions.resetForm();
                            }}
                        >
                            <FormikForm>
                                <Row className="g-2">
                                    <Col xs={12} md={8}>
                                        <Field
                                            name="title"
                                            as={Form.Control}
                                            type="text"
                                            placeholder="What you need to do?"
                                        />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Button className="w-100" type="submit">Add</Button>
                                    </Col>
                                </Row>
                            </FormikForm>

                        </Formik>

                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Card.Title className="mb-0">Tasks</Card.Title>
                        <div>
                            <Badge bg="secondary" pill>
                                {completedCount} / {totalCount}
                            </Badge>
                        </div>
                        </div>

                        <ButtonGroup className="mb-3">
                            <Button
                                variant={filter === 'all' ? "secondary" : "outline-secondary"}
                                size="sm"
                                onClick={() => setFilter('all')}
                            >All</Button>
                            <Button
                                variant={filter === 'active' ? "secondary" : "outline-secondary"}
                                size="sm"
                                onClick={() => setFilter('active')}
                            >Active</Button>
                            <Button
                                variant={filter === 'completed' ? "secondary" : "outline-secondary"}
                                size="sm"
                                onClick={() => setFilter('completed')}
                            >Completed</Button>
                        </ButtonGroup>

                        <ListGroup>
                            {filteredTodos.length === 0 ? (
                                <ListGroup.Item className="text-muted fst-italic">No tasks yet!</ListGroup.Item>
                            ) : (
                                filteredTodos.map(todo => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        onToggle={() => handleToggleTodo(todo.id)}
                                        onDelete={() => handleDeleteTodo(todo.id)}
                                        />
                                ))
                            )}
                        </ListGroup>

                        <div className="d-flex justify-content-end mt-3">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                disabled = {!hasCompleted}
                                onClick={handleClearCompleted}
                            >
                                Clear completed
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default App
