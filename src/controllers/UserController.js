const jwt = require("jsonwebtoken")

const User = require('../models/User')

// Validation
const { validation } = require("../utils/validation")
const bcrypt = require("bcrypt")

module.exports = {
    async auth(req, res) {
        const {name, email, password, confirmPassword} = req.body
        console.log(req.body)

        // Validations
        const nameValidation = validation("Name", name, 3)
        const emailValidation = validation("E-mail", email, 15)
        const passwordValidation = validation("Password", password, 10)

        if (nameValidation) {
            return res.status(422).json({ msg: nameValidation })
        }

        if (emailValidation) {
            return res.status(422).json({ msg: emailValidation })
        }

        if (passwordValidation) {
            return res.status(422).json({ msg: passwordValidation })
        }

        if (password !== confirmPassword) {
            return res.status(422).json({msg: "Password doesn't match"})
        }

        // Check E-mail
        const findEmail = await User.findOne({email: email})

        if(findEmail) {
            return res.status(404).json({ msg: "E-mail already exists" });
        }

        // Create Password
        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(password, salt)

        // Create User
        const user =  new User({
            name, 
            email,
            password: passHash
        })

        try {
            await user.save()

            res.status(200).json({msg: "User created succefully"})

        } catch (err) {
            res.status(500).json({msg: err})
        }
    },

    async login(req, res) {

        const {email, password} = req.body

        // Validations
        const emailValidation = validation("E-mail", email, 15)
        const passwordValidation = validation("Password", password, 10)

        if (emailValidation) {
            return res.status(422).json({ msg: emailValidation })
        }

        if (passwordValidation) {
            return res.status(422).json({ msg: passwordValidation })
        }

        // Check if user Exists
        const user = await User.findOne({email: email})

        if(!user) {
            return res.status(404).json({ msg: "User or Password invalid" });
        }

        // Check password
        const checkPass = await bcrypt.compare(password, user.password)

        if (!checkPass) {
            return res.status(404).json({ msg: "User or Password invalid" });
        }

        try {

            const secret = process.env.secret
            const token = jwt.sign({
                    id: user._id,
                    name: user.name
                },
                secret
            )

            res.status(200).json({msg: "Login succefully", token})

        } catch (err) {
            console.log(err)
        }
    },

    async private(req, res) {
        const id = req.params.id

        const user = await User.findById(id, '-password')

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ user });

    }
}