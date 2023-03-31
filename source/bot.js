require('dotenv').config()
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const { default: axios } = require('axios')
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,10})+$/gi
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(ctx => ctx.reply('Для авторизации введите свой email: '))
bot.on(message('text'), async ctx => {
	const email = ctx.update.message.text.trim()
	if (emailRegExp.test(email)) {
		const { data } = await axios.get('http://localhost:3000/emails')
		if (data.length < 0 || !data) {
			ctx.reply('база пуста: ')
		}
		const isHasEmail = data.find(item => item.email === email)
		if (typeof isHasEmail === 'object' && Boolean(isHasEmail.email)) {
			const { data } = await axios.get(`http://localhost:3000/emails?email=${isHasEmail.email}`)
			await axios.patch(`http://localhost:3000/emails/${data[0].id}`, {
				...isHasEmail,
				chatId: ctx.botInfo.id,
				userId: ctx.from.id,
			})
			ctx.reply('спасибо за ответ, вы будете уведомлени!')
		} else {
			ctx.reply('email не найден в базе: ')
		}
	} else {
		ctx.reply('email написан не правильно: ')
	}
})

bot.on('мой_id', ctx => {
	ctx.reply('Твой ID: ' + ctx.from_user.id)
})
bot.launch()
// a)	Создать бота со следующим функционалом
// i)	При стартер бот запрашивает email
// ii)	При вводе email ищется пользователь в базе с таким email и его присваивается telegram id из его сообщения
// iii)	Если пользователь не найден сообщается об ошибке
// iv)	Если успешно, сообщается что теперь будут уведомления
// v)	При совершении события пользователю по id пишет бот с информацией
