const mongoose = require("mongoose");

/**
 * Schema satellite
 */

const satelliteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  distance: {
    type: Number,
    required: true,
    trim: true,
  },
  message: {
    type: Array,
    required: true,
  },
  creado: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Satellite", satelliteSchema);
