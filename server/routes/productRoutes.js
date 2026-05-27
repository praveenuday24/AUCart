const express = require('express');

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
  
const authMiddleware = require(
"../middleware/authMiddleware"
);

const roleMiddleware = require(
"../middleware/roleMiddleware"
);

const router = express.Router();

//PUBLIC ROUTES

router.get("/", getProducts);

router.get("/:id" , getProduct);

//Admin Routes
router.post("/",
authMiddleware,
roleMiddleware("admin"),
createProduct
);

router.put("/:id",
authMiddleware,
roleMiddleware("admin"),
updateProduct
);

router.delete("/:id",
authMiddleware,
roleMiddleware("admin"),
deleteProduct
);

module.exports = router;

