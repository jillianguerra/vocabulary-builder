const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

app.use(express.json()) // req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'public', 'img','logo.png')))
app.use(express.static(path.join(__dirname, 'public')))
// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/vocabs', ensureLoggedIn, require('./routes/api/vocabs'));
app.use('/api/lists', ensureLoggedIn, require('./routes/api/lists'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app