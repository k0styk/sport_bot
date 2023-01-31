import axios from 'axios';
import {
	Message,
	SendPollOptions,
	ChatId,
	Poll,
	StopPollOptions,
} from 'node-telegram-bot-api';

interface TgResponse<T> {
	ok: boolean;
	result: T;
}

interface ISendPoll {
	chatId: ChatId;
	question: string;
	pollOptions: readonly string[];
	options?: SendPollOptions | undefined;
}

interface IStopPoll {
	chatId: ChatId;
	messageId: number;
	options?: StopPollOptions | undefined;
}

export class TgPolls {
	static instance = axios.create({
		baseURL: `https://api.telegram.org/bot${process.env.BOT_TOKEN}`,
		timeout: 3000,
		headers: {
			Accept: 'application/json',
		},
	});

	public static async sendPoll({
		chatId,
		question,
		pollOptions,
		options,
	}: ISendPoll) {
		try {
			const { data } = await this.instance.post<TgResponse<Message>>(
				`sendPoll`,
				{
					chat_id: chatId,
					question,
					options: JSON.stringify(pollOptions),
					...options,
				}
			);

			return data.result;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
			} else {
				console.log('unexpected error: ', error);
			}
		}
	}

	public static async stopPoll({ chatId, messageId, options }: IStopPoll) {
		try {
			const { data } = await this.instance.post<TgResponse<Poll>>(`stopPoll`, {
				chat_id: chatId,
				message_id: messageId,
				...options,
			});

			return data.result;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
			} else {
				console.log('unexpected error: ', error);
			}
		}
	}
}
