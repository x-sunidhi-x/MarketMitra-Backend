const mongoose=require("mongoose");
const express=require("express");
const bodyparser=require("body-parser");
const cors = require("cors")
const cookieparser = require("cookie-parser")
const customerAuthRoutes=require("./controller/customerAuthRoutes")
const customerDetailsRoutes=require("./controller/customerDetailsRoutes")
const sellerAuthRoutes=require("./controller/sellerAuthRoutes")
const { validateUserToken } = require("./auth/auth")
mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://gopalansunidhi:1234@cluster0.uguxjgn.mongodb.net/MarketMitra")
var db = mongoose.connection
db.on("open", () => {
  console.log("Connected to DB")
})
db.on("error", () => console.log("Not Connected to DB"))
const app=express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieparser());

app.use("/customer-auth", customerAuthRoutes);
app.use("/customer-details", customerDetailsRoutes);
app.use("/seller-auth", sellerAuthRoutes);

app.listen(8000, () => console.log("Server started at 8000"))



