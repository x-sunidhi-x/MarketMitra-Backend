const express = require("express")
const customerDetailsRoutes = express.Router()
const CustomerSchema = require("../models/CustomerSchema")
const SellerSchema = require("../models/SellerSchema")
const ProductSchema=require("../models/ProductSchema")
const Orders=require("../models/Orders")

customerDetailsRoutes.get("/", (req, res) => {
    CustomerSchema.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//show products catalog here
//implement geo spatial query!!!!!!!!
customerDetailsRoutes.get("/products",(req,res)=>{
 const [lattitude,longitude]=req.user.location.coordinates;
  SellerSchema.find({
    location:{
      $near:{
        $geometry:{
          type:'Point',
          coordinates:[lattitude,longitude]
        },
        $maxDistance:5*1000
      }
    }
  }).then(sellers=>{
    ProductSchema.find({seller_email:sellers.email})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  })
    
})

//show pending customer orders
customerDetailsRoutes.get("/orders",(req,res)=>{
  const email=req.user.email
  Orders.find({cust_email:email, completed:false})
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
})

module.exports= customerDetailsRoutes;


