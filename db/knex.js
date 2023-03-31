require('dotenv').config()
const axios = require('axios')
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

// проверка подключения
// knex.raw('SELECT VERSION()').then(() => {
//     console.log('connection to db successfull');
// });
module.exports = knex
