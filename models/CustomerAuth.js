const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const uniqueValidator = require("mongoose-unique-validator")
const CustomerAuth = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  {
    collection: "CustomerAuth",
  }
)

CustomerAuth.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    console.log(error)
  }
})

CustomerAuth.pre(
  ["update", "findByIdAndUpdate", "findOneAndUpdate"],
  async function (next) {
    const password = this.getUpdate().$set.password
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        this.getUpdate().$set.password = hashedPassword
        next()
      } catch (error) {
        console.log(error)
      }
    }
  }
)

CustomerAuth.plugin(uniqueValidator)


module.exports = mongoose.model("CustomerAuth", CustomerAuth)
