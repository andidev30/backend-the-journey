require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const multiparty = require("connect-multiparty")
const MultipartyMiddleware =  multiparty({uploadDir: './uploads'})

const app = express();
const port = 5000;

app.use(cors())

app.use(bodyParser.json());


// app.use('/Images', express.static("Images"))
app.use('/uploads', express.static("uploads"))

const routerv1 = require('./routes/routerv1');
app.use('/api/v1', routerv1)

app.post('/upload-ck-editor', MultipartyMiddleware, (req, res) => {
    console.log(req.files.upload)
    var TempFile = req.files.upload.path;
    // res.send({
    //     data : TempFile
    // })
    res.status(200).json({
        uploaded: true,
        url: `http://localhost:5000/${TempFile}`
    })
})

app.use("/", (req, res) => {
    res.send("api the journey");
});

app.listen(port, () => console.log(`listening on port ${port}`));