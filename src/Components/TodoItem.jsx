import {Button, Form, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";

function TodoItem({todo, onToggle, onDelete}) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
                <Form.Check
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </span>
            </div>

            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(todo.id)}
            >
                ✕
            </Button>
        </ListGroup.Item>
    );
}
TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default TodoItem;