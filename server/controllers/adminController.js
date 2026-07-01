const User =
require("../models/User");

const Order =
require("../models/Order");

const getAnalytics =
async (req, res) => {

    const users =
    await User.countDocuments();

    const orders =
    await Order.countDocuments();

    const revenue =
    await Order.aggregate([
        {
            $group: {
                _id: null,
                revenue: {
                    $sum:
                    "$totalAmount"
                }
            }
        }
    ]);

    res.json({
        users,
        orders,
        revenue:
            revenue[0]?.revenue || 0
    });
};

module.exports = {
    getAnalytics
};