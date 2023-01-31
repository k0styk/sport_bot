type Interval =
	| 'year'
	| 'quarter'
	| 'month'
	| 'week'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second';

export const date = {
	/**
	 * Returns the UNIX timestamp for the given `date`. Defaults to `Date.now()`
	 * when not providing the `date` argument to the method call.
	 *
	 * @returns {Number}
	 */
	unixTimestamp: (date = Date.now()) => Math.floor(date / 1000),
	/**
	 * Returns a date instance from the given `unixTimestamp`.
	 *
	 * @param {Number} unixTimestamp  Number of seconds since Unix epoch
	 *
	 * @returns {Number}
	 */
	toDate: (unixTimestamp: number) => new Date(unixTimestamp * 1000),
	/**
	 * Adds time to a date. Modelled after MySQL DATE_ADD function.
	 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
	 * https://stackoverflow.com/a/1214753/18511
	 *
	 * @param date  Date to start with
	 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
	 * @param units  Number of units of the given interval to add.
	 */
	dateAdd: function (date: Date, interval: Interval, units: number) {
		if (!(date instanceof Date)) return undefined;
		var ret = new Date(date); //don't change original date
		var checkRollover = function () {
			if (ret.getDate() != date.getDate()) ret.setDate(0);
		};
		switch (interval) {
			case 'year':
				ret.setFullYear(ret.getFullYear() + units);
				checkRollover();
				break;
			case 'quarter':
				ret.setMonth(ret.getMonth() + 3 * units);
				checkRollover();
				break;
			case 'month':
				ret.setMonth(ret.getMonth() + units);
				checkRollover();
				break;
			case 'week':
				ret.setDate(ret.getDate() + 7 * units);
				break;
			case 'day':
				ret.setDate(ret.getDate() + units);
				break;
			case 'hour':
				ret.setTime(ret.getTime() + units * 3600000);
				break;
			case 'minute':
				ret.setTime(ret.getTime() + units * 60000);
				break;
			case 'second':
				ret.setTime(ret.getTime() + units * 1000);
				break;
		}
		return ret;
	},
};
