//sellerAuthRoutes.js
const express = require("express")
const bcrypt = require("bcrypt")
const sellerAuthRoutes = express.Router()
const SellerAuth = require("../models/SellerAuth")
const { createUserToken } = require("../auth/auth")


const { getOTP, verifyOTP } = require("../auth/auth")

// SEND-FORGOT-PASSWORD-OTP
sellerAuthRoutes.post("/send-otp", (req, res) => {
  const { email } = req.body    
  getOTP(email)
  res.json({ message: "Success" })
  
})

sellerAuthRoutes.get("/", (req, res) => {
    SellerAuth.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//SIGNUP


sellerAuthRoutes.post("/signup", (req, res) => {
  const { name, email, password, otp } = req.body
  const match= verifyOTP(email,otp)
  if(match){
    SellerAuth.create(
    {
      name: name,
      email: email,
      password: password,
    })
    .then(data=>{
      const accessToken = createUserToken({ email: email })
        res.cookie("user", accessToken, {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        })
        res.json({ message: "Success" })
    })
    .catch(err=>{
      res.json({ error: err, status: 500 })
    })
  }
    
});

//LOGIN
sellerAuthRoutes.post("/login", (req, res) => {
  const { email, password } = req.body;
  SellerAuth.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.json({ error: "User does not exist", status: 500 });
      } else {
        const hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword)
          .then((match) => {
            if (match) {
              const accessToken = createUserToken({ email: email });
              res.cookie("user", accessToken, {
                sameSite: "none",
                secure: true,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000,
              });
              res.json({ message: "Success" });
            } else {
              res.json({ error: "Invalid credentials", status: 500 });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({ error: "Failed", status: 500 });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ error: "Unable to fetch user", status: 500 });
    });
});


//LOGOUT
sellerAuthRoutes.get("/logout", (req, res) => {
  res.cookie(
    "user",
    {},
    {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    }
  )
  res.json({ message: "Success" })
})

module.exports = sellerAuthRoutes