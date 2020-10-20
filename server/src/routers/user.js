const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        let emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (req.body.email !== "" && emailCheck.test(req.body.email) && req.body.password === req.body.confirm_password) {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token, status: true, message: 'User Created Successfully' });
        } else {
            res.status(422).send({ status: false, message: 'Invalid Data' });
        }
    } catch (e) {
        res.status(400).send(e)
    }
})



router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token, status: true, message: 'User Login Successfully' })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router