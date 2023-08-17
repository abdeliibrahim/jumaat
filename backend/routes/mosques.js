const express = require('express')
// const Mosque = require('../models/mosqueModel')
const {addMosque,
    getAllMosques,
    getMosque,
    deleteMosque,
    updateMosque,
    scrapeController,
    clearDatabase
} = require('../controllers/mosqueController')
// const { scrapeController } = require('../controllers/scrape');

const router = express.Router()

router.get('/', getAllMosques)

router.get('/scrape', scrapeController);

router.get('/:id', getMosque)

router.post('/', addMosque)
router.post('/clear', clearDatabase);

router.delete('/:id', deleteMosque)

router.patch('/:id', updateMosque)

module.exports = router