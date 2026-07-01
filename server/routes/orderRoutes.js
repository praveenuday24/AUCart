const express = require("express");

const {
    createOrder,
    getOrders,
    getAllOrders,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createOrder
);

router.get(
    "/",
    authMiddleware,
    getOrders
);
router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAllOrders
)

module.exports = router;