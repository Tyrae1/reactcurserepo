import PropTypes from "prop-types";
import ContactCard from "./ContactCard";

export default function ContactList ({contacts = [], onEdit, onDelete}) {
    if (!contacts.length) {
        return <p>No contacts yet!</p>;
    }

    return (
        <div>
            {contacts.map((contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                ))}
        </div>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};