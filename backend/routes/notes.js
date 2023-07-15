const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

//Route 1: Get all the notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

//Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid name').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 letters').isLength({ min: 5 })
], async (req, res) => {
    try {


        const { title, description, tag } = req.body
        //If there are errors send bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }
        const note = new Notes({ title, description, tag, user: req.user.id })
        const savednote = await note.save()

        res.json(savednote);
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

//Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //Create a newNote object
        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be updated and updated
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        res.status(500).send("Server Error")
    }

})

//Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be updated and updated
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    }
    catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router;
