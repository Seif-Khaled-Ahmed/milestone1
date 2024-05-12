const mongoose = require("mongoose")

const customersc = new mongoose.Schema({
    name: String,
    password: String

})
module.exports = mongoose.model("customer",customersc)