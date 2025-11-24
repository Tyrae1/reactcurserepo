import {useEffect, useState} from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import ContactList from './components/ContactList';
import ContactFormModal from './components/ContactFormModal';
import debounce from "lodash.debounce";

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

    const [searchQuery, setSearchQuery] = useState('');
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
    };
    const handleSaveContact = (data) => {
        if (editingContact) {
            setContacts((prev) =>
            prev.map((c) => (c.id === data.id ? {...c, ...data} : c)));
        } else {
            const newContact = {
                ...data,
                id: Date.now(),
            };
            setContacts((prev) => [newContact, ...prev]);
        }
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const debouncedSetSearchQuery = debounce((value) => {
        setSearchQuery(value);
    }, 300);
    const handleSearchChange = (event) => {
        debouncedSetSearchQuery(event.target.value);
    }
    const filteredContacts = contacts.filter(contact => {
        if (!searchQuery.trim()) return true;
        const term = searchQuery.toLowerCase();
        return (
            contact.name.toLowerCase().includes(term) ||
            contact.phone.toLowerCase().includes(term)
        );
    });
  return (
    <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 m-0">Phonebook</h1>
            <Button variant="primary" onClick={handleAddClick}>
                Add Contact
            </Button>
        </div>
        <div className="mb-3">
            <Form.Control
                type="text"
                placeholder="Search by name or phone...."
                onChange={handleSearchChange}
                />
        </div>
        <ContactList
            contacts={filteredContacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
        />
        <ContactFormModal
            show={isModalOpen}
            onClose={handleCloseModal}
            contact={editingContact}
            onSave={handleSaveContact}
        />
    </Container>
  );
}

export default App
