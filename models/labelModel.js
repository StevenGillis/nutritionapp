const mongoose = require("mongoose");
//get access to Schema constructor
const Schema = mongoose.Schema;

const labelType = {
    DISH: 'dish',
    INGREDIENT: 'ingredient',
    FOODRELATED: 'foodrelated',
    OTHER: 'other'
}

//create a new schema for our app
const schema = new Schema({
  name: {type: String, required:false, unique: true},
  description: {type: String, required:false},
  photos: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
  labelType: { type: labelType, required: false},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

schema.pre('save', function(next) {
  if (!this.createdAt){
    this.createdAt = new Date();
  }else {
    this.updatedAt = new Date();
  }
  next();
});

schema.pre('update', function(next) {
  this.updatedAt = new Date();
  next();
});

// export the model with associated name and schema
module.exports = mongoose.model("Label", schema);