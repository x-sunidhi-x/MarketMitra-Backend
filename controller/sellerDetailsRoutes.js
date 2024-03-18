const express = require("express")
const sellerDetailsRoutes = express.Router()
const SellerSchema = require("../models/SellerSchema")
const ProductSchema=require("../models/ProductSchema")
const Orders=require("../models/Orders")

sellerDetailsRoutes.get("/", (req, res) => {
    SellerSchema.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

sellerDetailsRoutes.get("/products", (req, res) => {
    const email=req.user.email;
    ProductSchema.find({seller_email:email})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports= sellerDetailsRoutes;


