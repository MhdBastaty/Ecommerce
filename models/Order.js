const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    userId: {type: String, required: true},
    product: [
    {
        productId: {
            type: String
        },
        quantity: {
        type: Number, default: 1
            }
        }
    ],
   amount: {type: String, required: true},
   address: {type: Object,required: true},                     //I define it as this cuz wec can have many field iside the address
   status: {type:String, default: "pending"}
},
    {timestamps: true}
);


module.exports = mongoose.model("Order", OrderSchema);