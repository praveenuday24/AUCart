

const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
    {
        user:{
            type:
            mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        products: [
            {
                product:{
                    type:
                        mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                },
                quantity : Number,
            }
        ],
        totalAmount : Number,

        paymentStatus: {
            type : String,
            enum: [
                "pending",
                "paid",
                "failed"
            ],
            default : "pending",
        },

        orderStatus: {
            type : String,
            default : "processing",
        },
    },
    {
        timestamps : true,
    },
);

module.exports = mongoose.model(
    "Order",
    OrderSchema
);
