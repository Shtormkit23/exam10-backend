const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const config = require("./config");
const news = require("./app/news");
const comments = require("./app/comments");
const db = require("./mysql");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    app.use("/news", news(db(connection)));
    app.use("/comments", comments(db(connection)));
    console.log("Connected to mysql");
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
});