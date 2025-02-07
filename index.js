const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT||8081;
app.use(cors());
app.use(express.json());
const userRouter = require("./route/user.routes");
const taskRouter = require("./route/task.routes");

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to the Kazamevtech backend" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }

})
app.use("/", userRouter);
app.use("/api",taskRouter)

app.listen(PORT, async () => {
  console.log("Backend Is Runing");
  try {
    await connection;
console.log("Connected to Sever At Port: ",PORT);
  } catch (error) {
    console.log(error);
    console.log("error getting to connect with data base");
  }
});
