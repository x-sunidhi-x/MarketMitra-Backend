const mongoose = require("mongoose")
//name description price rating image
const ProductSchema = new mongoose.Schema(
  {
    prod_name:{
        type: String, requried:true
    },
    prod_description:{
        type: String, requried:true
    },
    rating:{
        type: Number, default:0
    },
    price:{
        type: Number, requried:true
    },
    images:{
        public_id:{
            type:String, required:true
        },
        url:{
            type:String, required:true
        }
    },
    category:{
        type:String, required:true
    },
    seller_email:{
        type:String, required:true
    },
    stock:{
        type:Number, default:0
    }
  },
  {
    collection: "ProductSchema",
  }
)

module.exports=mongoose.model("ProductSchema", ProductSchema)