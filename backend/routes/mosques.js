const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'GET all mosques'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single mosque'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'POST new mosque'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a mosque'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a mosque'})
})
module.exports = router