const mongoose = require("mongoose");
require("dotenv").config();

const mongodb_api_key = process.env.MONGODB_KEY;

const url= `mongodb+srv://slyasindu:${mongodb_api_key}@cluster0.gltftqv.mongodb.net/JobSiteProject?retryWrites=true&w=majority`;

const connectionParams = {
    useUnifiedTopology: true,
};


mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.info("connected to the db");
  })
  .catch((e) => {
    console.log("error", e);
  });
  const jobSchema = new mongoose.Schema({
    Title: {
      type: String,
      require: true,
    },
    Category: {
      type: String,
      require: true,
    },
    Company: {
      type: String,
      require: true,
    },
    ShortDescription: {
      type: String,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    Requirements: {
      type: String,
      require: true,
    },
    Benefits: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
    },
    Website: {
      type: String,
      require: true,
    },
    ShortDescreption: {
      type: String,
      require: true,
    },
  });

  const userSchema = new mongoose.Schema({
    Firstname: {
      type: String,
      require: true,
    },
    Lastname: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
    },
    Password: {
      type: String,
      require: true,
    },
  });

  const jobs = mongoose.model("jobs", jobSchema);
  const user = mongoose.model("user", userSchema);

  module.exports= {jobs, user};