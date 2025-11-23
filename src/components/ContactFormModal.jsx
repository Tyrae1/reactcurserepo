import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";

export default function ContactFormModal({show, onClose, contact}) {
    const isEditModal = Boolean(contact);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditModal ? 'Edit Contact' : 'Add Contact'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isEditModal ? (
                    <div>
                        <p><strong>Name:</strong>{contact.name}</p>
                        <p><strong>Phone:</strong>{contact.phone}</p>
                        {contact.email && (
                            <p><strong>Email:</strong>{contact.email}</p>
                        )}
                    </div>
                ) : (
                    <p>Here will be a form to create a new contact</p>
                )}
            </Modal.Body>
        </Modal>
    );
}
ContactFormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contact: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
    }),
};