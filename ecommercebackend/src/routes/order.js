const router = require('express').Router();
const {
    requireSignin, 
    userMiddleware, 
} = require('../common-middleware/middleware');
const { 
    addOrder, getOrders,
} = require('../controller/order');

router.post("/addorder", requireSignin, userMiddleware, addOrder);
router.get("/getorders", requireSignin, userMiddleware, getOrders);

module.exports = router;
