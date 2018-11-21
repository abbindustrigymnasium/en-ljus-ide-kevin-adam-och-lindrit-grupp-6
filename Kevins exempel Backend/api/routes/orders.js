const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'memes were fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productID,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'memes were fresh',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'memez',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'memez deded',
        orderId: req.params.orderId
    });
});

module.exports = router;