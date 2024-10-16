const Quote = require('../models/Quote');
const path = require('path');

exports.createQuote = async (req, res) => {
  try {
    const { quote, language, author } = req.body;
    const newQuote = await Quote.create({ quote, language, author});
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

exports.updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    
    const { quote: updatedQuote, language, author } = req.body;
    
    await quote.update({ quote: updatedQuote, language, author });
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
