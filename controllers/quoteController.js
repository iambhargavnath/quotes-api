const Quote = require('../models/Quote');
const multer = require('multer');
const path = require('path');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.createQuote = upload.single('authorImage'), async (req, res) => {
  try {
    const { quote, language, author } = req.body;
    const authorImage = req.file.filename;
    const newQuote = await Quote.create({ quote, language, author, authorImage });
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuote = upload.single('authorImage'), async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    
    const { quote: updatedQuote, language, author } = req.body;
    const authorImage = req.file ? req.file.filename : quote.authorImage;
    
    await quote.update({ quote: updatedQuote, language, author, authorImage });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    await quote.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
