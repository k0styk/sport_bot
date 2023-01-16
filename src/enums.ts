export enum COMMANDS {
	start = 'start',
	stop = 'stop',
	startPoll = 'start_poll',
	endPoll = 'end_poll',
	randomizeTeams = 'random_teams',
	users = 'users',
}

export enum HANDLERS {
	poll = 'poll',
	pollAnswer = 'poll_answer',
	callbackQuery = 'callback_query',
	pollingError = 'polling_error',
	error = 'error',
}
