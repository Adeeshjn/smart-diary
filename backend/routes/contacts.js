const express = require('express');
const router = express.Router();
const Contacts = require('../models/Contacts')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

// Route 1: Get all the contacts of a user using: GET "/api/contacts/fetchallcontacts". Login required
router.get('/fetchallcontacts', fetchuser, async (req, res) => {
    try {
        const contacts = await Contacts.find({ user: req.user.id });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Route 2: Add a new contact using: POST "/api/contacts/addcontact". Login required
router.post('/addcontact', fetchuser, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('phone', 'Enter a valid phone number').isLength({ min: 10, max: 10}),
], async (req, res) => {
    //If there are errors send bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const { name, email, phone, address, city, pincode } = req.body;
        const contact = new Contacts({
            user: req.user.id,
            name,
            email,
            phone,
            address,
            city,
            pincode,
        })
        const savedContact = await contact.save();
        res.json(savedContact);
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Route 3: Update an existing contact using: PUT "/api/contacts/updatecontact". Login required
router.put('/updatecontact/:id', fetchuser, async (req, res) => {
    try {
        const { name, email, phone, address, city, pincode } = req.body;
        // Create a newContact object
        const newContact = {};
        if (name) { newContact.name = name };
        if (email) { newContact.email = email };
        if (phone) { newContact.phone = phone };
        if (address) { newContact.address = address };
        if (city) { newContact.city = city };
        if (pincode) { newContact.pincode = pincode };
        // Find the contact to be updated and update it
        let contact = await Contacts.findById(req.params.id);
        if (!contact) { return res.status(404).send('Not found') };
        // Check if the user owns this contact
        if (contact.user.toString() !== req.user.id) { return res.status(401).send('Not allowed') };
        contact = await Contacts.findByIdAndUpdate(req.params.id, { $set: newContact }, { new: true });
        res.json(contact);
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Route 4: Delete an existing contact using: DELETE "/api/contacts/deletecontact". Login required
router.delete('/deletecontact/:id', fetchuser, async (req, res) => {
    try {
        if(contact.user.toString() !== req.user.id) { return res.status(401).send('Not allowed') }
        let contact = await Contacts.findById(req.params.id);
        if (!contact) { return res.status(404).send('Not found') };
        contact = await Contacts.findByIdAndDelete(req.params.id);
        res.json("contact has been deleted", contact);
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;