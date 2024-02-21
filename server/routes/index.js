const { Router } = require('express');

const orderRouter = require('./orderRouter');


const router = Router();

// api
router.use('/orders', orderRouter);


module.exports = router;




