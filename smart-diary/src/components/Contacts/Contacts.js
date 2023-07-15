import React, { useContext } from 'react'
import contactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';


export const Contacts = () => {
    const context = useContext(contactContext);
    const { contacts, getContacts, editContact } = context;
    const [contact, setContact] = useState({ id: "", ename: "", nemail: "", ephone: "", eaddress: "", ecity: "", epincode: "" })
    useEffect(() => {
        getContacts();
    }, [])
    const updateContact = (contact) => {
        ref.current.click();
        setContact({ id: contact._id, ename: contact.name, nemail: contact.email, ephone: contact.phone, eaddress: contact.address, ecity: contact.city, epincode: contact.pincode })
    }
    const ref = useRef(null);
    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        editContact(contact.id, contact.ename, contact.nemail, contact.ephone, contact.eaddress, contact.ecity, contact.epincode);
    }
    return (
        <div className="container">
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Update Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="ename" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name='ename' onChange={onChange} value={contact.ename} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nemail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="nemail" name='nemail' onChange={onChange} value={contact.nemail}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ephone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="ephone" name='ephone' onChange={onChange} value={contact.ephone}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eaddress" className="form-label">Adress</label>
                                    <input type="text" className="form-control" id="eaddress" name='eaddress' onChange={onChange} value={contact.ephone}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ecity" className="form-label">City</label>
                                    <input type="text" className="form-control" id="ecity" name='ecity' onChange={onChange} value={contact.ecity}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="epincode" className="form-label">Pincode</label>
                                    <input type="text" className="form-control" id="epincode" name='epincode' onChange={onChange} value={contact.epincode}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Update Contact</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Link to="/addContact" className="btn btn-primary my-3">Add Contact</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Contacts</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="container">
                        {contacts.length === 0 && 'No contacts to display'}
                    </div>
                    <div className="row">
                        {contacts.map((contact) => {
                            return <ContactItem key={contact._id} contact={contact} updateContact={updateContact} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts;