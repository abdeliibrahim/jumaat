const Mosque = require('../models/mosqueModel')
const mongoose = require('mongoose')
const {searchMosques} = require('./scrape')

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
    // const {title, address} = req.body
    const mosquesData = req.body;
    
    try {
        // const mosque = await Mosque.create({title, address})
        const createdMosques = await Promise.all(mosquesData.map(async mosque => {
            const { title, address, gUrl } = mosque;
            const createdMosque = await Mosque.create({ title, address, gUrl });
            return createdMosque; }));
        res.status(200).json(createdMosques)

    } catch (error) {
        res.status(400).json({error: error.message})

    }
}


// delete workout
const deleteMosque = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Mosque not found"})
    }

    const mosque = await Mosque.findOneAndDelete({_id: id})

    if(!mosque) {
        return res.status(404).json({error: "Mosque not found"})
    }
    res.status(200).json(mosque)
}

// update mosque
const updateMosque = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Mosque not found"})
    }

    const mosque = await Mosque.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!mosque) {
        return res.status(404).json({error: "Mosque not found"})
    }
    res.status(200).json(mosque)

 }
 const scrapeController = async (req, res) => {
    const zipcode = req.query.zipcode; // Get the zipcode from the query parameter

    try {
        const scrapedData = await searchMosques(zipcode);
        res.status(200).json(scrapedData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping data.' });
    }
};





module.exports = {
    addMosque,
    getAllMosques,
    getMosque,
    deleteMosque,
    updateMosque,
    scrapeController
}