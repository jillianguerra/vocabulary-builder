require('dotenv').config()

require('./config/database')

const app = require('./app-server')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`${PORT} Having fun isn't hard when you've got yourself a library card.`)
})
