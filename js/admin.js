const mongoose = require("mongoose")

const adminsc = new mongoose.Schema({
    name: String,
    email: String,

})
module.exports = mongoose.model("admin",adminsc)
