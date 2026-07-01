const express = require( "express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getUsers } = require("../controllers/userController");


const router = express.Router();

router.get(
    "/profile",
    authMiddleware,
    (req,res)=>{
        res.json({
            message : "Protected Route Accessed",
            user: req.user
        })
    }
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getUsers
)

module.exports = router;