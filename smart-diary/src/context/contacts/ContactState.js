import React from 'react';
import { useState } from 'react';
import contactContext from './contactContext';

const ContactState = (props) => {
    const host = "http://localhost:5000"
    const contactsInitial = []
    const [contacts, setContacts] = useState(contactsInitial)
    const getContacts = async () => {
        const response = await fetch(`${host}/api/contacts/fetchallcontacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const data = await response.json();
        setContacts(data);
    }
    const addContact = async (name, email, phone, address, city, pincode) => {
        //api call
        const response = await fetch(`${host}/api/contacts/addcontact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, phone, address, city, pincode })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        const contact = json
        if (json._id !== null) {
            setContacts(contacts.concat(contact));
        }
    }
    const deleteContact = async (id) => {
        //api call
        const response = await fetch(`${host}/api/contacts/deletecontact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if (json.success) {
            const newContacts = contacts.filter((contact) => { return contact._id !== id })
            setContacts(newContacts);
        }
    }
    const editContact = async (id, name, email, phone, address, city, pincode) => {
        //api call
        const response = await fetch(`${host}/api/contacts/updatecontact/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, phone, address, city, pincode })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        let newContacts = JSON.parse(JSON.stringify(contacts))
        for (let index = 0; index < newContacts.length; index++) {
            const element = newContacts[index];
            if (element._id === id) {
                newContacts[index].name = name;
                newContacts[index].email = email;
                newContacts[index].phone = phone;
                newContacts[index].address = address;
                newContacts[index].city = city;
                newContacts[index].pincode = pincode;
                break;
            }
        }
        setContacts(newContacts);
    }


    return (
        <contactContext.Provider value={{ contacts, setContacts, addContact, getContacts, deleteContact, editContact }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;