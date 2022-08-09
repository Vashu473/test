const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./src/schema");
const port = process.env.PORT || 80;
const cors = require("cors");
// starting db
const startdb = async () => {
  await mongoose.connect(
    "mongodb+srv://vashu:vashudev143@cluster0.zaq0o.mongodb.net/?retryWrites=true&w=majority"
  );
};
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.use(cors());
// adding middleware
app.use(express.json());
// routes
app.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    return res.json({ data: user, status: true });
  } catch (error) {
    return res.json({ data: error, status: false });
  }
});
app.post("/", async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();
    return res.json({ data: user, status: true });
  } catch (error) {
    return res.json({ data: error, status: false });
  }
});
app.patch("/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await User.findOneAndUpdate(_id, req.body);
    await user.save();
    return res.json({ data: user, status: true });
  } catch (error) {
    return res.json({ data: error, status: false });
  }
});
app.delete("/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await User.findOneAndDelete(_id);
    await user.save();
    return res.json({ data: user, status: true });
  } catch (error) {
    return res.json({ data: error, status: false });
  }
});
const startServer = async () => {
  await startdb();
  app.listen(port, () => {
    console.log("server started");
  });
};
startServer();
