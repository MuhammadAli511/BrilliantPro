const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    materialName: {
      type: String,
      required: true,
    },
    materialType: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    courseTitles: {
      type: [String],
      required: true
    }
  });

module.exports = mongoose.model('Material', materialSchema);