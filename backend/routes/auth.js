const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');
const JWT_SECRET = '!@!*VDE(#($JD(#';
// Route 1:Create an User at '/api/auth/createuser' . No login required
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 letters').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors send bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Check if a user already exists with the given email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'This email already exists' })
        }
        //if not the create a new user
        const salt = await bcrypt.genSalt(10);
        var secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        /*.then(user => res.json(user)).catch(err=>{res.json({error:'The Email entered is not unique'})});*/
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken:authtoken, success:true});
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});
// Route 2: Create an User at '/api/auth/login' . No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    //If there are errors send bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let  user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with right credentials" });
        }
        const passcmp = await bcrypt.compare(password, user.password);
        if (!passcmp) {
            return res.status(400).json({ error: "Please try to login with right credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken:authtoken, success:true});
    } catch (error) {
        res.status(500).send('Internal server error');
    }

});

// Route 2: Get logged in User Details at '/api/auth/getuser' . Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
