const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const usersController = require('./server/users/users.controller');
const homesController = require('./server/homes/homes.controller');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.use('/homes', homesController);
app.use('/users', usersController);

app.use('/assets', express.static(publicPath));

mongoose.connect('mongodb://db_user:mayayehudit1@ds247330.mlab.com:47330/subdog_project');

app.all('*', (req,res) => res.sendFile(`${publicPath}/index.html`));

const port = 5001;
app.listen(port,() => console.log(`Server listening to: ${port}`));