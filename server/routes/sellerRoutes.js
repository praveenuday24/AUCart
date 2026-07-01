const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const sellerMiddleware = require("../middleware/sellerMiddleware");
const sellerController = require("../controllers/sellerController");

router.get(
    "/products",
    authMiddleware,
    sellerMiddleware,
    sellerController.getMyProducts
    );
    
    router.post(
    "/products",
    authMiddleware,
    sellerMiddleware,
    sellerController.createProduct
    );
    
    router.put(
    "/products/:id",
    authMiddleware,
    sellerMiddleware,
    sellerController.updateProduct
    );
    
    router.delete(
    "/products/:id",
    authMiddleware,
    sellerMiddleware,
    sellerController.deleteProduct
    );
    
    router.get(
    "/orders",
    authMiddleware,
    sellerMiddleware,
    sellerController.getSellerOrders
    );
    
    router.get(
    "/analytics",
    authMiddleware,
    sellerMiddleware,
    sellerController.getSellerAnalytics
    );
    
    module.exports = router;