require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./configs/dbConn");

connectDB();

// Parse form-encoded data to req.body
app.use(express.urlencoded({extended: true}));
// Parse json data to req.body
app.use(express.json());

app.use("/api/pins", require("./routes/pins"));
app.use("/api/users", require("./routes/users"));

mongoose.connection.once("open", () => {
    console.log("Connected to DB");

    app.listen(8800, () => {
        console.log("Server is running on port 8800");
    })
})