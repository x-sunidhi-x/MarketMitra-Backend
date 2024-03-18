//email, address, orders
const mongoose=require("mongoose")

const CustomerSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true, index: true }, //foreign key
      location:{
        type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
      },
      num_of_orders:{
        type:Number, required:true, default:0
      }
  

    },
    {
      collection: "CustomerSchema",
    }
  )

  module.exports=mongoose.model("CustomerSchema", CustomerSchema)