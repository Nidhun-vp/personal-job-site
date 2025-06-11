// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: String,
//   company: String,
//   category: String,
//   location: String,
//   description: String,
//   postedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Job", jobSchema);

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  category: String,
  location: String,
  description: String,
  date: Date,                
  applyLink: String,        
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);

