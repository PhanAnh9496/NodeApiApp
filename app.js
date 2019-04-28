const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//Connect Database
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB Connected")
    });

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`)
});

//Routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//Api Document
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            return res.status(400).json({
                error : err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//use Routes
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

//JWT
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: "Unauthorized"});
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`NodeJs Api đang chờ ở cổng: ${port}`);
});