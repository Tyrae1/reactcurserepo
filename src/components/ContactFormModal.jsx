import PropTypes from "prop-types";
import {Modal, Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import {PhoneInput} from "react-international-phone";

const contactValidationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .required("Name is required"),
    phone: Yup.string()
    .trim()
    .required("Phone is required"),
    email: Yup.string()
    .trim()
        .email("Invalid email format")
    .notRequired(),
});

export default function ContactFormModal({show, onClose, contact, onSave}) {
    const isEditModal = Boolean(contact);

    const initialValues = {
        name: contact?.name || "",
        phone: contact?.phone || "",
        email: contact?.email || "",
    };

    const handleSubmit = (values, formikHelpers) => {
        const result = contact
        ? { ...values, id: contact.id }
            : values;
        onSave(result);
        formikHelpers.setSubmitting(false);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={contactValidationSchema}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      errors,
                      touched,
                      setFieldValue,
                }) => (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {isEditModal ? 'Edit Contact' : 'Add Contact'}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="contactName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contactPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <PhoneInput
                                        defaultCountry="ua"
                                        name="phone"
                                        value={values.phone}
                                        onChange={(phone) => setFieldValue("phone", phone)}
                                        className={touched.phone && errors.phone ? "is-invalid" : ""}
                                        />
                                    {touched.phone && errors.phone && (
                                        <div className="text-danger mt-1">{errors.phone}</div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contactEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Enter email (optional)"
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-end gap-2 mt-3">
                                    <Button variant="secondary" type="button" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        {isEditModal
                                        ? (isSubmitting ? "Saving..." : "Save changes")
                                        : (isSubmitting ? "Adding..." : "Add contact")
                                        }
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </>
                )}
            </Formik>
        </Modal>
    );
}
ContactFormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
};