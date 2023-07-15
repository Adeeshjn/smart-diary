import React, { useContext } from 'react'
import contactContext from '../../context/contacts/contactContext';
const ContactItem = (props) => {
    const { contact, updateContact } = props;
    const context = useContext(contactContext);
    const { deleteContact } = context;
    return (
        <div className="col-md-3">
            <div className="card-header">
                <h5 className="card-title">{contact.name}</h5>
            </div>
            <div className="card-body">

                <p className="card-text">{contact.email}</p>
                <p className="card-text">{contact.phone}</p>
                <p className="card-text">{contact.address}</p>
                <p className="card-text">{contact.city}</p>
                <p className="card-text">{contact.pincode}</p>
                <i className="fa-regular fa-trash-can" onClick={() => { deleteContact(contact._id) }}></i>
                <i className="fa-regular fa-pen-to-square mx-2" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { updateContact(contact) }}></i>
            </div>
        </div>
    )
}

export default ContactItem;