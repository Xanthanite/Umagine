var mongoose = require("mongoose"),

BookingSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  favcolor: String,
  mood: String,
  address: String,
  phonenumber: String,
})


module.exports = mongoose.model("Booking", BookingSchema);