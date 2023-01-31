import TelegramBot, { Message } from 'node-telegram-bot-api';

import { errorHandler } from '@/handlers';
import {
	UsersController,
	ChatsController,
	PollsController,
	Timer,
} from '@/controllers';
import { TgPolls } from '@/utils';
import { config } from '@/config';

/*
 * Handle start command
 */
export const start = (bot: TelegramBot) => async (message: Message) => {
	const { chat, from } = message;

	if (from?.id) {
		if (!config.admins.ids.includes(from.id)) return;
		const timer = Timer.getInstance();
		const chatId = message.chat.id;

		try {
			bot.sendChatAction(chatId, 'typing');
			// Activate / create a new user
			await UsersController.firstOrCreate(from);
			await ChatsController.create(chat);
			const correctOptionId = 0;

			const msg = await TgPolls.sendPoll({
				chatId,
				question: 'Football?',
				pollOptions: ['+', '-'],
				options: {
					is_anonymous: false,
					type: 'quiz',
					correct_option_id: correctOptionId,
				},
			});
			const poll = msg?.poll;

			if (poll) {
				await PollsController.create({
					poll,
					chatId,
					messageId: msg.message_id,
					date: config.polls.createPoll(),
					correctOptionId,
				});
				timer.addCustomCallback(
					() => PollsController.checkPoll(poll.id, chatId),
					poll.id
				);
			}
		} catch (error) {
			errorHandler(bot, chatId, error);
		}
	}
};

/*

{
  message_id: 85,
  from: {
    id: 5945851992,
    is_bot: true,
    first_name: 'Спортзальный бот',
    username: 'tyumen_dorojnik_football_bot'
  },
  chat: {
    id: -816762711,
    title: 'Test polls',
    type: 'group',
    all_members_are_administrators: true
  },
  date: 1673887814,
  poll: {
    id: '5346185478276121544',
    question: 'Football?',
    options: [ [Object], [Object] ],
    total_voter_count: 0,
    open_period: 119,
    close_date: 1673887933,
    is_closed: false,
    is_anonymous: false,
    type: 'quiz',
    allows_multiple_answers: false,
    correct_option_id: 0
  }
}

{
  message_id: 82,
  from: {
    id: 5945851992,
    is_bot: true,
    first_name: 'Спортзальный бот',
    username: 'tyumen_dorojnik_football_bot'
  },
  chat: {
    id: -816762711,
    title: 'Test polls',
    type: 'group',
    all_members_are_administrators: true
  },
  date: 1673885509,
  poll: {
    id: '5346185478276121532',
    question: 'Football?',
    options: [ [Object], [Object] ],
    total_voter_count: 0,
    is_closed: false,
    is_anonymous: false,
    type: 'quiz',
    allows_multiple_answers: false,
    correct_option_id: 0
  }
}

*/

/*

//! chat
{
  message_id: 8,
  from: {
    id: 133066125,
    is_bot: false,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    language_code: 'ru'
  },
  chat: {
    id: -816762711,
    title: 'Test polls',
    type: 'group',
    all_members_are_administrators: true
  },
  date: 1673303259,
  text: '/start',
  entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
}


//! LS
{
  message_id: 10,
  from: {
    id: 133066125,
    is_bot: false,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    language_code: 'ru'
  },
  chat: {
    id: 133066125,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    type: 'private'
  },
  date: 1673303308,
  text: '/start',
  entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
}

*/
