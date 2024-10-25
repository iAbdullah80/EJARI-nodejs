const express = require('express')
const router = express.Router()
const basicAuth = require('../middleware/auth')
const mainController = require('../controllers/mainController')


router.post('/api/books', basicAuth, mainController.create) // protected
router.get('/api/books', mainController.get_all_books)
router.get('/api/books/:id', mainController.get_specific_book)
router.put('/api/books/:id', basicAuth, mainController.update_specific_book) // protected
router.delete('/api/books/:id', basicAuth, mainController.delete_specific_book) // protected

module.exports = router