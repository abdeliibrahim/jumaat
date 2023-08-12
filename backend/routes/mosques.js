const express = require('express')
const Mosque = require('../models/mosqueModel')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'GET all mosques'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single mosque'})
})

router.post('/', async (req, res) => {
    const {title, address} = req.body
    
    try {
        const mosque = await Mosque.create({title, address})
        res.status(200).json(mosque)

    } catch (error) {
        res.status(400).json({error: error.message})

    }

    // res.json({mssg: 'POST new mosque'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a mosque'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a mosque'})
})
module.exports = router