let express = require("express");
let connection = require("./database/config");
let router = require("./routes/index");
let errorHandler = require("./middleware/errorHandler");
let cors = require("cors");
const cookieParser = require("cookie-parser");

let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(router);
connection();
app.use("/storage", express.static("storage"));

app.use(errorHandler);
app.post("/ll", async (req, res) => {
  res.send("hello");
});
app.listen(5000, () => {
  console.log("app running");
});

// let express=require('express');
// let app=express();

// app.get('/signup',(req,res)=>{
//   res.send({"msg":"Working"})
// })
// app.listen(3000);
