import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum:['HIGH','MEDIUM','LOW']
  },
},
{
  timestamps: true
});
module.exports = mongoose.model("Todo", TodoSchema);