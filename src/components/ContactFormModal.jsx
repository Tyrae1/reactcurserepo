import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";

export default function ContactFormModal({show, onClose}) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Form will be here
            </Modal.Body>
        </Modal>
    );
}
ContactFormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};