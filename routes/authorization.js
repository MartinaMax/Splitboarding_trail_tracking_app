const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

// Registration of a user
router.post("/register", async (req, res) => {

    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const emailRegistered = await user.findOne({email: req.body.email });
    
    if (emailRegistered) {
        return res.status(400).json({ error: "Email alredy registerd"});
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const userObject = new user ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password,
        date
    });

    try {
        const registerUser = await userObject.save();
        res.json({ error: null, data: registerUser._id });
    } catch (error) {
        res.status(400).json({error})
    }

});


// User login
router.post("/login", async (req, res) => {
    
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const users = await user.findOne({email: req.body.email });
    
    if (!users) {
        return res.status(400).json({ error: "The user with this email was not found."});
    }

    const validPassword = await bcrypt.compare(req.body.password, users.password)

    if (!validPassword) {
        return res.status(400).json({ error: "Wrong password. Try again."});
    }

    const token = jwt.sign (
        {
            name: users.name,
            id: users.id
        },

       process.env.TOKEN_SECRET,
       {expiresIn: process.env.JWT_EXPIRES_IN},
    );

        // Atteching the token to header
        res.header("auth-token", token).json({
            error: null,
            data: { token }
        })
});


module.exports = router;
