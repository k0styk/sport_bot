import TelegramBot from 'node-telegram-bot-api';
import moment from 'moment';

import { botError } from '@/handlers';
import { TgPolls } from '@/utils';
import Polls from '@/models/polls';
import { Timer } from '@/controllers';
import { config } from '@/config';

interface IPollsController {
	poll: TelegramBot.Poll;
	date?: moment.Moment;
	chatId: number;
	messageId: number;
	correctOptionId: number;
}

export class PollsController {
	public static async create({
		poll,
		date,
		chatId,
		messageId,
		correctOptionId,
	}: IPollsController) {
		try {
			if (poll && chatId && messageId) {
				const defaultDate = moment()
					.day('Wednesday')
					.hour(20)
					.minute(30)
					.second(0);
				await Polls.create({
					...poll,
					chatId,
					messageId,
					correctOptionId,
					...{
						endDateUnix: date ? date.unix() : defaultDate.unix(),
						endDate: date ? date : defaultDate,
					},
				});
			}
		} catch (error) {
			botError(error as Error);
		}
	}
	public static async update(id: string, userId: number, optionIds: number[]) {
		const poll = await Polls.findOne({ id });
		if (poll) {
			poll.answers.push({ userId, optionIds });
			await poll.save();
		}
	}
	public static async checkPoll(id: string, chatId: number) {
		const poll = await Polls.findOne({ id, chatId });
		if (poll) {
			if (poll.endDateUnix < moment().unix()) {
				const stoppedPoll = await TgPolls.stopPoll({
					chatId,
					messageId: poll.messageId,
				});

				if (stoppedPoll) {
					const timer = Timer.getInstance();
					timer.removeCustomCallback(stoppedPoll.id);
					if (stoppedPoll.total_voter_count >= config.polls.totalVoterCount) {
						// if (
						// 	stoppedPoll.options[poll.correctOptionId]?.voter_count >=
						// 	config.polls.totalVoterCount
						// ) {
						// 	// TODO: Random
						// }
					}
				}

				/*
					{
  id: '5366058051436544894',
  question: 'Football?',
  options: [ { text: '+', voter_count: 1 }, { text: '-', voter_count: 0 } ],
  total_voter_count: 1,
  is_closed: true,
  is_anonymous: false,
  type: 'quiz',
  allows_multiple_answers: false,
  correct_option_id: 0
}
					*/
			}
		}
	}
}
