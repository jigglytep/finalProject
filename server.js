require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptons');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;


// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


// routes
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/register'));
app.use('/users', require('./routes/api/users'));
app.use('/states', require('./routes/api/states'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});