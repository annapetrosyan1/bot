require('dotenv').config()
const axios = require('axios')
const { list } = require('../source/bot')
const knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	pool: { min: 2, max: 10 },
})

const usersList = {}
for (row of list) {
	axios
		.post('http://localhost:3000/emails', {
			email: row,
		})
		.then(resp => {
			console.log(resp.data)
		})
		.catch(error => {
			console.log(error)
		})
}

// проверка подключения
// knex.raw('SELECT VERSION()').then(() => {
//     console.log('connection to db successfull');
// });
module.exports = knex
