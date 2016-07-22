class Common {
	static isInInterval(x, min, max) {
		if(x) {
			if(min && max) {
				return x >= min && x <= max;
			} else { //Dans le cas où seulement un min ou un max est spécifié:
				if(min)
					return x >= min;

				if(max)
					return x <= max;
			}
		}

		return false;
	}

	/**
	 * Check if x === y or x >= min && x <= max:
	 **/
	static isInIntervalOrEqual(x, y, min, max) {
		//Les falsy values en Javascript correspondent à undefined, null, false, 0, ""...
		//donc inutile de faire un call sur hasOwnProperty, il suffit simplement de
		//checker si la condition est true (par exemple, si la variable est undefined, la condition sera false):

		//La vérification sur Equal a une importance plus élévée que la vérification sur
		//l'intervalle. On le teste en premier:
		if(y)
			return x === y;
		else {
			if(min || max)
				return Common.isInInterval(x, min, max);
		}

		return false;
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
