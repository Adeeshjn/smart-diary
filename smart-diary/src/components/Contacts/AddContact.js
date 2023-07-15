import React from 'react'
import { useContext, useState } from 'react'
import ContactContext from '../../context/contacts/contactContext'
import { useHistory } from 'react-router-dom';
const AddContact = () => {
    const context = useContext(ContactContext);
    const { addContact } = context;
    const history = useHistory();

    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "", city:"", pincode:"" })
    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        addContact(contact.name, contact.email, contact.phone, contact.address, contact.city, contact.pincode);
        setContact({name: "", email: "", phone: "", address: "", city:"", pincode:""});
        console.log(contact);
        history.push("/contacts");
    }
    return (
        <div>
            <h1>Add a new Contact</h1>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" name='email' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name='phone' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Adress</label>
                    <input type="text" className="form-control" id="address" name='address' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name='city' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input type="text" className="form-control" id="pincode" name='pincode' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary mx-1" onClick={handleClick}>Add Contact</button>
            </form>
        </div>
    )
}

export default AddContact;