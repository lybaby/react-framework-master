import GUID from './GUID';

class Timer {
	constructor() {
		this.clients = {};

		this.timer = setInterval(() => {
			Object.keys(this.clients).forEach(id => {
				this.clients[id].timeleft -= 10;
				if (this.clients[id].timeleft <= 0) {
					const callback = this.clients[id].callback;
					if (this.clients[id].repeat) {
						this.clients[id].timeleft = this.clients[id].timeout;
					}					else {
						delete this.clients[id];
					}
					setTimeout(callback, 0);
				}
			});
		}, 10);
	}

	initTimer = (timeout, callback, repeat = true) => {
		if (typeof timeout === 'number' && timeout > 0 && typeof callback === 'function') {
			const id = GUID();
			this.clients[id] = {
				timeout,
				callback,
				repeat: !!repeat,
				timeleft: timeout,
			};
			return id;
		}
		return false;
	}

	resetTimer = id => {
		if (id && this.clients[id]) {
			this.clients[id].timeleft = this.clients[id].timeout;
		}
	}

	clearTimer = id => {
		if (id) {
			delete this.clients[id];
		}
	}
}

export default new Timer();
