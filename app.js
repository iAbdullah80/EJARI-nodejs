const express = require('express')
const app = express()
app.use(express.json());

app.use('/', require('./routes/mainRoute'))

module.exports = app;