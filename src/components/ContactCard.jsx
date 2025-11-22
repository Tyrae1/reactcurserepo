import PropTypes from "prop-types";
import { Card, Button } from 'react-bootstrap';

export default function ContactCard({contact}) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{contact.name}</Card.Title>
                <Card.Text>
                    <div>📞 {contact.phone}</div>
                    {contact.email && <div>✉️ {contact.email}</div>}
                </Card.Text>

                <div className="d-flex gap-2">
                    <Button variant="warning" size="sm">
                        Edit
                    </Button>
                    <Button variant="danger" size="sm">
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
}