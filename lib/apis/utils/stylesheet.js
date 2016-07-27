class StyleSheet {
	static merge(target, source) {
		for(let property in source) {
			let toMerge = source[property];
			if(target.hasOwnProperty(property)) {
				if(typeof(toMerge) === "object" && !Array.isArray(toMerge)) 
					target[property] = Object.assign({}, target[property], toMerge);
				else 
					target[property] = toMerge;
			}
			else {
				target[property] = toMerge;
			}
		}

		return target;
	}

	static parseSizeFeature(feature) {
		let parsed = feature.match(/([a-zA-Z\-]+): ?([0-9]+\.?[0-9]*)/);

		if(parsed)
			return {
				key: parsed[1],
				value: Number(parsed[2])
			};

		return null;
	}

	static toCamelCase(str) {
		return str.replace(/-([a-z])/gi, (match, group1) => {
			return group1.toUpperCase();
		});
	}
}

export default StyleSheet;