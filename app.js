const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const expressValidator  = require('express-validator')
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

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//use Routes
app.use('/', postRoutes);
app.use('/', authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`NodeJs Api đang chờ ở cổng: ${port}`);
});