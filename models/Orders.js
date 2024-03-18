//cust_email, seller_email,order item name, price?, date of order?
//completed/pending, 
//delivery date?
const mongoose=require("mongoose")

const Orders = new mongoose.Schema(
    {
      cust_email: { type: String, required: true, unique: true, index: true }, //key from customerschema and auth
      seller_email: { type: String, required: true, unique: true, index: true },//key from sellerschema and auth
      item_name:{
        type:String, required:true, default:0
      },
      price: {type:Number, required:true, default:0},
      completed: {type:Boolean, required:true, default:false},
      order_date: {type: Date},
      delivery_date: {type: Date}
    },
    {
      collection: "Orders",
    }
  )

  module.exports=mongoose.model("Orders", Orders)