const Mosque = require('../models/mosqueModel')
const mongoose = require('mongoose')

// get all mosques
const getAllMosques = async (req, res) => {
    const allMosques = await Mosque.find({})
    res.status(200).json(allMosques)
}

// get mosque
const getMosque = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Mosque not found"})
    }
    const mosque = await Mosque.findById(id)
    if(!mosque) {
        return res.status(404).json({error: "Mosque not found"})
    }
    res.status(200).json(mosque)
}

// add mosque
const addMosque = async (req, res) => {
    const {title, address} = req.body
    
    try {
        const mosque = await Mosque.create({title, address})
        res.status(200).json(mosque)

    } catch (error) {
        res.status(400).json({error: error.message})

    }
}


// delete workout

// update mosque


module.exports = {
    addMosque,
    getAllMosques,
    getMosque
}