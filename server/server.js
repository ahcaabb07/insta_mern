const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {DB_URL} = require('./config/database');
const AUTH = require('./routes/auth');
const PORT = process.env.PORT || 5000;
const app = express();

// @APP use
app.use(bodyParser.json());
app.use(AUTH);

// @Mongodb Connection
mongoose
.connect(DB_URL , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Mongodb is connected successfuly'))
.catch(err => console.log(err));

// @server run on
app.listen(PORT , () => console.log(`Server running on port ${PORT}`));