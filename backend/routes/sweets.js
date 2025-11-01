const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const sweetController = require('../controllers/sweetController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.post('/', authenticateToken, requireAdmin, [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('category')
    .isIn(['chocolate', 'candy', 'cookie', 'cake', 'pastry', 'other'])
    .withMessage('Invalid category'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
], sweetController.createSweet);

router.get('/', authenticateToken, sweetController.getAllSweets);

router.get('/search', authenticateToken, [
  query('category')
    .optional()
    .isIn(['chocolate', 'candy', 'cookie', 'cake', 'pastry', 'other']),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
], sweetController.searchSweets);

router.put('/:id', authenticateToken, requireAdmin, [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .isLength({ max: 100 }),
  body('category')
    .optional()
    .isIn(['chocolate', 'candy', 'cookie', 'cake', 'pastry', 'other']),
  body('price')
    .optional()
    .isFloat({ min: 0 }),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
], sweetController.updateSweet);

router.delete('/:id', authenticateToken, requireAdmin, sweetController.deleteSweet);

router.post('/:id/purchase', authenticateToken, sweetController.purchaseSweet);

router.post('/:id/restock', authenticateToken, requireAdmin, [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Restock quantity must be a positive integer')
], sweetController.restockSweet);

module.exports = router;

