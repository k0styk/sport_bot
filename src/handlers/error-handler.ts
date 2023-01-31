import TelegramBot from 'node-telegram-bot-api';

/**
 * @param bot
 * @param chatId
 * @param error
 */
export const errorHandler = (
	bot: TelegramBot,
	chatId: number,
	error: unknown
) => {
	// Log errors in development mode
	if (error && !!process.env.NODE_ENV?.includes('dev')) {
		console.error(error);
	}
	bot.sendMessage(chatId, '\u{1F6AB} An error occurred, try again later.');
};
