class Common {
	static isInInterval(x, min, max, debug) {
		if(x || x === 0) {
			if((min || min === 0) && (max || max === 0)) {
				return x >= min && x <= max;
			} else {
				if(min || min === 0)
					return x >= min;
				if(max || max === 0)
					return x <= max;
			}
		}

		return false;
	}

	static isInIntervalOrEqual(x, y, min, max) {
		if(y || y === 0)
			return x === y;
		else
			return Common.isInInterval(x, min, max);
	}

	static debounce(callback, delay) {
		let timer;
		return () => {
			console.log(timer);
			clearTimeout(timer);
			console.log(timer);
			timer = setTimeout(
				callback,
				delay
			);
		};
	}
}

export default Common;
