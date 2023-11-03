const Express = require("express");
const {jobs, user} = require("./Mongodb/mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = Express();
require("dotenv").config();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", cors(), async (req, res) => {
  const allJobs = await jobs.find({});
  res.json(allJobs);
});

app.get("/adminpanel", async (req, res) => {
  try {
    const alljob = await jobs.find({});
    res.json(alljob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/adminpanel", async (req, res) => {
  const {
    Title,
    Category,
    Company,
    ShortDescription,
    Description,
    Requirements,
    Benefits,
    Email,
    Website,
  } = req.body.newJobData;
  

  const data = {
    Title: Title,
    Category: Category,
    Company: Company,
    ShortDescription: ShortDescription,
    Description: Description,
    Requirements: Requirements,
    Benefits: Benefits,
    Email: Email,
    Website: Website,
  };
 
  res.json("success");

  try {
    await jobs.insertMany([data]);
  } catch (e) {
    res.json("faild");
  }
});

app.delete("/adminpanel", async (req, res) => {
  const ID = req.query.id; 
  try {
    await jobs.deleteOne({ _id: ID });
    res.json("success"); 
  } catch (e) {
    res.status(500).json("failed"); 
  }
});

app.put("/adminpanel/:id", async (req, res) => {
  const id = req.params.id;
  const updatedJobData = req.body;
  try {
    const result = await jobs.updateOne({ _id: id }, { $set: updatedJobData });
    if (result.modifiedCount === 1) {
      res.json("success");
    } else {
      res.status(404).json("Job not found");
    }
  } catch (e) {
    res.status(500).json("failed");
  }
});

app.post("/signup", async (req, res) => {
  const { Firstname, Lastname, Email, Password } = req.body;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const passwordHash = await bcrypt.hash(Password, salt);

  const data = {
    Firstname: Firstname,
    Lastname: Lastname,
    Email: Email,
    Password: passwordHash,
  };

  try {
    const check = await user.findOne({ Email: Email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await user.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});


app.post("/signin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const check = await user.findOne({ Email: Email });

    if (!check) {
      res.json("notexist");
      return;
    }

    const isValidPassword = await bcrypt.compare(Password, check.Password);

    if (isValidPassword) {
      res.json("exist");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});



app.listen(port, () => {
  console.log("Server is Start port 8000");
});
