require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors())

app.use(bodyParser.json());

// app.use('/Images', express.static("Images"))
app.use('/uploads', express.static("uploads"))

const routerv1 = require('./routes/routerv1');
app.use('/api/v1', routerv1)

app.use("/", (req, res) => {
    res.send("api the journey");
});

app.listen(port, () => console.log(`listening on port ${port}`));