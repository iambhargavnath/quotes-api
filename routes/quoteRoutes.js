const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/', quoteController.createQuote);
router.get('/', quoteController.getQuotes);
router.get('/:id', quoteController.getQuote);
router.put('/:id', quoteController.updateQuote);
router.delete('/:id', quoteController.deleteQuote);

module.exports = router;
