const express = require('express')
// const Mosque = require('../models/mosqueModel')
const {addMosque,
    getAllMosques,
    getMosque
} = require('../controllers/mosqueController')

const router = express.Router()

router.get('/', getAllMosques)

router.get('/:id', getMosque)

router.post('/', addMosque)

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a mosque'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a mosque'})
})
module.exports = router