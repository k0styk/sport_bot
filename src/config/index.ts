import moment from 'moment';

const isDev = () => process.env.NODE_ENV === 'development';

export const config = {
	bot: {
		polling: true,
		onlyFirstMatch: true,
		filepath: false,
	},
	mongodb: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	admins: {
		ids: process.env.ADMINS?.split('#'),
	},
	timer: {
		SECONDS: isDev() ? 30 : 0,
		MINUTES: isDev() ? 0 : 5,
		HOURS: isDev() ? 0 : 0,
	},
	polls: {
		createPoll: () => {
			if (isDev()) return moment().add(1, 'minute');

			return moment().day('Wednesday').hour(20).minute(30).second(0);
		},
		totalVoterCount: isDev() ? 1 : 8,
	},
};
