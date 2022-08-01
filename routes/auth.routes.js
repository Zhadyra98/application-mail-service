const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.post('/login', async (req, res) => {
    try {
        const {name} = req.body
        const candidate = await User.findOne({name})
        const msgs = ["Hello Worls", "Amigo", "sdkmsaksn JN"];
        if(candidate){
            res.status(200).json({message: "Messages retrived", messages: msgs, userName: candidate.name })
        }
        const user = new User ({name})
        await user.save()
        res.status(201).json({message: "User is created", userName: user.name})

    } catch(error) {
        res.status(500).json({message: "Something went wrong"})
    }
})
module.exports = router