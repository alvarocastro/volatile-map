const DEFAULT_TTL = 600000; // 10 minutes

class VolatileMap extends Map {
	constructor (ttl) {
		super();
		this.ttl = ttl ?? DEFAULT_TTL;
		this.schedules = new Map();
	}

	delete (key) {
		super.delete(key);
		clearTimeout(this.schedules.get(key));
		this.schedules.delete(key);
	}

	set (key, value, ttl = this.ttl) {
		super.set(key, value);
		if (this.schedules.has(key)) {
			clearTimeout(this.schedules.get(key));
		}

		const schedule = setTimeout(() => {
			super.delete(key);
		}, ttl);
		this.schedules.set(key, schedule);
	}

	get (key) {
		return super.get(key);
	}
}

export default VolatileMap;
