const express = require('express');
const router = express.Router();
const {
    requireSignin, adminMiddleware 
} = require('../../common-middleware/middleware');
const {
  updateOrder, getCustomerOrders,
} = require('../../controller/admin/order');


router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(`/order/getcustomerorders`, requireSignin, adminMiddleware, getCustomerOrders);


module.exports = router;
