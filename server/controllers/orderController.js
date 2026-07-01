const Order = require("../models/Order");

const Product = require("../models/Product");



const createOrder = async(req,res) =>{
    try{
        const {products,totalAmount} = req.body;

        //Stock Check
        for(const item of products){
            const product = await Product.findById(item.product);
            if(product.stock < item.quantity){
                return res.status(400).json({
                    message : "Insufficient stock"
                })
            }

            //Reduce Stock
            product.stock -= item.quantity;

            await product.save();
        }

        //Create Order
        const order = await Order.create({
            user : req.user.id,
            products,
            totalAmount,
            paymentStatus: "paid",
        });
        res.status(201).json(order);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Get User Orders
const getOrders = async ( req,res ) =>{
    try{
        const orders = await Order.find({
            user: req.user.id,
        }).populate(
            "products.product"
        );
        res.status(200).json(
            orders
        );
    }
    catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const getAllOrders = async(req,res) =>{
    const orders = await Order.find().populate("user").populate("products.product");
    res.json(orders);
}


module.exports = {
    createOrder,
    getOrders,
    getAllOrders,
};