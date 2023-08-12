const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const mosqueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    address: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Mosques', mosqueSchema)
