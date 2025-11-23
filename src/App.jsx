import {useEffect, useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import ContactList from './components/ContactList';
import ContactFormModal from './components/ContactFormModal';

function App() {
    const [contacts, setContacts] = useState(() => {
        const saved = localStorage.getItem('phonebook_contacts');
       return saved ? JSON.parse(saved) : [
        {
            id: 1,
            name: 'John Doe',
            phone: '+1 234 567 890',
            email: "john@example.com",
        },
        {
            id: 2,
            name: 'Jane Smith',
            phone: '+1 234 567 890',
            email: "jane@example.com"
        },
    ];
});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        localStorage.setItem('phonebook_contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleAddClick = () => {
        setEditingContact(null);
        setIsModalOpen(true);
    }

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    }
    const handleDeleteContact = (id) => {
        if (!window.confirm("Delete this contact?")) return;
        setContacts(prev => prev.filter(contact => contact.id !== id));
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    }
  return (
    <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 m-0">Phonebook</h1>
            <Button variant="primary" onClick={handleAddClick}>
                Add Contact
            </Button>
        </div>

        <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
        />
        <ContactFormModal
            show={isModalOpen}
            onClose={handleCloseModal}
            contact={editingContact}
        />
    </Container>
  );
}

export default App
