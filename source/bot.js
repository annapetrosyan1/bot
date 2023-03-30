require('dotenv').config()
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,10})+$/gi
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(ctx => ctx.reply('Для авторизации введите свой email: '))

bot.on(message('start'), async ctx => {
	const email = await ctx.message.text
	if (emailRegExp.test(email)) {
		axios
			.post('http://localhost:3000/emails', {
				id: uuidv4,
				email,
			})
			.then(resp => {
				console.log(resp.data)
			})
			.catch(error => {
				console.log(error)
			})
		ctx.reply(`Вы успешно емайл ${email}`)
		return ''
	}
	ctx.reply(`Вы писали неверный емайл`)
})

// bot.on('мой_id', ctx => {
//   let user__id = ctx.from_user.id;
//   ctx.reply('Твой ID: ' + user__id)
// })
bot.launch()

// a)	Создать бота со следующим функционалом
// i)	При стартер бот запрашивает email
// ii)	При вводе email ищется пользователь в базе с таким email и его присваивается telegram id из его сообщения
// iii)	Если пользователь не найден сообщается об ошибке
// iv)	Если успешно, сообщается что теперь будут уведомления
// v)	При совершении события пользователю по id пишет бот с информацией
