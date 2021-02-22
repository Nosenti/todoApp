//create a model
import mongoose from "mongoose";
// import Schema  from "mongoose".Schema;
// import ObjectId from Schema.ObjectId;

const UserSchema = mongoose.Schema({
  // id: ObjectId,
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
},
{
  timestamps: true,
});
module.exports = mongoose.model("User", UserSchema);