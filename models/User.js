const { Schema, model, Types } = require('mongoose')

const schema = new Schema ({
    name : {type: String, required: true, unique: true},
    messages : [{type: Types.ObjectId, ref: 'Meassage'}]
})

module.exports = model('User', schema)