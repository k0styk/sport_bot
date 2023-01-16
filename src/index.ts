require('dotenv').config();
const mongoose = require('mongoose');
import TelegramBot from 'node-telegram-bot-api';

import * as handler from './handlers';
import * as commands from './commands';
import { config } from './config';
import { COMMANDS, HANDLERS } from './enums';

import { generateCommandRegExp as genCommand } from './utils/regexHelper';

const env = process.env;
if (!env.BOT_TOKEN) throw new Error('We need to provide token');
if (!env.MONGODB_URI)
	throw new Error('We need to provide mongo connection string');

const bot = new TelegramBot(env.BOT_TOKEN, config.bot);
mongoose.set('strictQuery', true);

mongoose
	.connect(env.MONGODB_URI, config.mongodb)
	.then(() => {
		console.info('Database connected');
		//! Commands
		bot.onText(genCommand(COMMANDS.start), commands.start(bot));
		bot.onText(genCommand(COMMANDS.stop), commands.stop(bot));
		// bot.onText(genCommand(COMMANDS.users), commands.users(bot));

		//! Handlers
		bot.on(HANDLERS.pollAnswer, handler.pollAnswer);
		// bot.on('callback_query', handler.callbackQuery(bot));
		bot.on(HANDLERS.pollingError, handler.botError);
		bot.on(HANDLERS.error, handler.botError);

		console.info(`\u{1F41D} ${env.BOT_NAME} started successfully`);
	})
	.catch((error: Error) => console.error(error));

//! END POLL EVENT
// bot.on('poll', (msg) => {
// 	console.log('POLL ENDED');
// 	console.log(msg);
// });
// bot.on('callback_query', handler.callbackQuery);
