require('dotenv').config();
const mongoose = require('mongoose');
import TelegramBot from 'node-telegram-bot-api';

import * as handler from '@/handlers';
import * as commands from '@/commands';
import { Timer } from '@/controllers';
import { config } from './config';
import { COMMANDS, HANDLERS } from './enums';

import Users from '@/models/users';
import Polls from '@/models/polls';
import Chats from '@/models/chats';

import {
	generateClosedCommandRegExp as closedCommand,
	generateMatchedCommandRegExp as matchedCommand,
} from './utils';

const { SECONDS, MINUTES, HOURS } = config.timer;
const time = () =>
	HOURS * 60 * 60 * 1000 + MINUTES * 60 * 1000 + SECONDS * 1000;

const timer = Timer.getInstance();

timer.registerCallbacks([], time());
timer.start();

const env = process.env;
const mongoUrl = env.PROD_MONGODB_URL || env.MONGODB_URI;
if (!env.BOT_TOKEN) throw new Error('We need to provide token');
if (!mongoUrl) throw new Error('We need to provide mongo connection string');

const bot = new TelegramBot(env.BOT_TOKEN, config.bot);
mongoose.set('strictQuery', true);

mongoose
	.connect(mongoUrl, config.mongodb)
	.then(() => {
		console.info('Database connected');

		//! Commands
		bot.onText(closedCommand(COMMANDS.start), commands.start(bot));
		// bot.onText(closedCommand(COMMANDS.stop), commands.stop(bot));
		// bot.onText(matchedCommand(COMMANDS.getChat), commands.getChat(bot));
		// bot.onText(/\/get_chat (.+)/, commands.getChat(bot));
		// bot.onText(genCommand(COMANDS.users), commands.users(bot));

		//! Handlers
		bot.on(HANDLERS.pollAnswer, handler.pollAnswer);
		// @ts-ignore
		bot.on(HANDLERS.poll, handler.poll);
		// bot.on('callback_query', handler.callbackQuery(bot));
		bot.on(HANDLERS.pollingError, handler.botError);
		bot.on(HANDLERS.error, handler.botError);

		console.info(
			`\t⚽ ${env.BOT_NAME} started successfully\n\tfind them at https://t.me/${env.TELEGRAM_BOT_NAME}`
		);
	})
	.catch((error: Error) => console.error(error));
