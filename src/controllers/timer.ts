type fn = (...args: any[]) => void;

export class Timer {
	private static _instance: Timer = new Timer();
	private callbacks: fn[] = [];
	private idsCallbacks: number[] = [];
	private customCallbacks: fn[] = [];
	private customIdsCallbacks: (number | string)[] = [];
	private nextId: number = 0;
	private timerId: ReturnType<typeof setInterval> | undefined = undefined;
	private timeout: number | undefined;

	constructor() {
		if (Timer._instance) {
			throw new Error(
				'Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.'
			);
		}
		Timer._instance = this;
	}

	public static getInstance(): Timer {
		return Timer._instance;
	}

	public registerCallbacks(callbacks: fn[], timeout: number) {
		callbacks.map((cb) => this.addCallback(cb));
		this.timeout = timeout;
	}

	public addCallback(cb: fn) {
		const id = this.nextId;

		this.callbacks.push(cb);
		this.idsCallbacks.push(this.nextId);
		this.nextId++;

		return () => {
			// find the function position using the ids array:
			const fnIndex = this.idsCallbacks.findIndex((cbId) => cbId === id);

			if (fnIndex === -1) return; // or throw something

			// Now remove the element from both arrays:
			this.callbacks.splice(fnIndex, 1);
			this.idsCallbacks.splice(fnIndex, 1);
		};
	}

	public addCustomCallback(cb: fn, customId: number | string) {
		this.customCallbacks.push(cb);
		this.customIdsCallbacks.push(customId);

		return () => {
			const fnIndex = this.customIdsCallbacks.findIndex(
				(cbId) => cbId === customId
			);

			if (fnIndex === -1) return; // or throw something

			this.customCallbacks.splice(fnIndex, 1);
			this.customIdsCallbacks.splice(fnIndex, 1);
		};
	}

	public removeCustomCallback(customId: number | string) {
		const fnIndex = this.customIdsCallbacks.findIndex(
			(cbId) => cbId === customId
		);

		if (fnIndex === -1) return; // or throw something

		// Now remove the element from both arrays:
		this.customCallbacks.splice(fnIndex, 1);
		this.customIdsCallbacks.splice(fnIndex, 1);
	}

	public start() {
		this.timerId = setInterval(() => {
			this.callbacks.forEach((v) => v());
			this.customCallbacks.forEach((v) => v());
		}, this.timeout);
	}

	public stop() {
		clearInterval(this.timerId);
	}
}
