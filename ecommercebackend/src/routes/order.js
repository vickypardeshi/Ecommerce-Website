const router = require('express').Router();
const {
    requireSignin, 
    userMiddleware, 
} = require('../common-middleware/middleware');
const { 
    addOrder, getOrders, getOrder,
} = require('../controller/order');

router.post("/addorder", requireSignin, userMiddleware, addOrder);
router.get("/getorders", requireSignin, userMiddleware, getOrders);
router.post("/getorder", requireSignin, userMiddleware, getOrder);

module.exports = router;
