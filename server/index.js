const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mail-system')

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    try {
        const allUsers = await User.find({}, 'name');
        let doesExist = allUsers.find(item => item.name===req.body.name);
        if(doesExist){
            res.json({status: 'ok', userName: req.body.name})
            return
        }
        const user = await User.create({
            name: req.body.name
        })
        res.json({status: 'ok', userName: user.name})
    } catch(error) {
        res.json({status: 'error'})
    }
})

app.listen(1337 , () => {
    console.log('Server is running on 1337');
    
})