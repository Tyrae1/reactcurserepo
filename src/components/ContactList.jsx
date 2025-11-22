import PropTypes from "prop-types";
import ContactCard from "./ContactCard";

export default function ContactList ({contacts = []}) {
    return (
        <div>
            {contacts.length === 0 ? (
                <p>No contacts yet.</p>
            ) : (
                contacts.map((contact) => <ContactCard key = {contact.id} contact={contact} />)
            )}
        </div>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.array,
};