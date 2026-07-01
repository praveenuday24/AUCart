
const Product = require("../models/Product");
const Order = require("../models/Order");

//GET /api/seller/products

const getMyProducts = async(req,res) =>{
    try{
        const products = await Product.find({
            seller : req.user.id,
        })

        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
};

//POST /api/seller/products
const createProduct = async (req,res) =>{
    try{
        const product = await Product.create({
            ...req.body,
            seller : req.user.id,
        });
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
};

//PUT /api/seller/products/:id
const updateProduct = async (req,res) =>{
    try{
        const product = await Product.findOneAndUpdate(
            {
                _id : req.params.id,
                seller : req.user.id,
            },
            req.body,
            {
                new : true
            }
        );
        if(!product){
            return res.status(500).json({
                message : "Product not found",
            })
        };
        res.json(product);
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
};

//DELETE /api/seller/products/:id

const deleteProduct = async(req,res) =>{
    try{
        const product = await Product.findOneAndDelete({
            _id : req.params.id,
            seller : req.user.id,
        })

        if(!product){
            return res.status(404).json({
                message : "Product not found",
            })
        }
        res.json({
            message : "Product Deleted Successfully",
        })
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

//GET /api/seller/orders
const getSellerOrders = async(req,res) =>{
    try{
        const orders = await Order.find()
            .populate("user","name email")
            .populate("products.product");

        const sellerOrders = orders.filter(order => {
            order.products.some( item => item.product && item.product.seller.toString() === req.user.id);
        });
        res.json(sellerOrders);
    }
    catch(error){
        res.status(500).json({
            error : message.error
        })
    }
}

//GET /api/seller/analytics

const getSellerAnalytics = async(req,res) => {
    try{
        const products = await Product.find({
            seller : req.user.id
        });
        const productIds = products.map(p => p._id.toString());
        const orders = await Order.find().populate("products.product");
        
        let revenue = 0;
        let totalOrders = 0;
        let productsSold = 0;

        orders.forEach(order => {
            let hasSellerProduct = false;

            order.products.forEach(item => {
                if(item.product && productIds.includes(item.product._id.toString())){
                    hasSellerProduct = true;
                    revenue += item.product.price * item.quantity;
                    productsSold += item.quantity;
                }
            });

            if(hasSellerProduct){
                totalOrders++;
            }
        });

        res.json({
            totalProducts: products.length,
            totalOrders,
            productsSold,
            revenue
        });
    }catch(error){
        res.json({
            message : error.message
        })
    }
}

module.exports = {
    getMyProducts,
    getSellerAnalytics,
    getSellerOrders,
    deleteProduct,
    updateProduct,
    createProduct
}