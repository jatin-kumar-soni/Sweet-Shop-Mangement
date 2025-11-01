const { validationResult } = require('express-validator');
const Sweet = require('../models/Sweet');

exports.createSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, quantity } = req.body;

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity: quantity || 0
    });

    await sweet.save();

    res.status(201).json({
      message: 'Sweet created successfully',
      sweet
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json({ sweets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    res.json({ sweets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (name) sweet.name = name;
    if (category) sweet.category = category;
    if (price !== undefined) sweet.price = price;
    if (quantity !== undefined) sweet.quantity = quantity;

    await sweet.save();

    res.json({
      message: 'Sweet updated successfully',
      sweet
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity: purchaseQuantity = 1 } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < purchaseQuantity) {
      return res.status(400).json({ 
        message: 'Insufficient quantity in stock' 
      });
    }

    sweet.quantity -= purchaseQuantity;
    await sweet.save();

    res.json({
      message: 'Purchase successful',
      sweet
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity: restockQuantity } = req.body;

    if (!restockQuantity || restockQuantity <= 0) {
      return res.status(400).json({ 
        message: 'Valid restock quantity is required' 
      });
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += restockQuantity;
    await sweet.save();

    res.json({
      message: 'Restock successful',
      sweet
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

