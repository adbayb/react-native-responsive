import { CommonUtil } from "../apis";

class Model {
	constructor(expected) {
		this.expected = expected;
	}

	static isInIntervalOrEqualFromOperator(operator, expected, actual) {
		switch(operator) {
			case "min": return Model.isInIntervalOrEqual(actual, null, expected);
			case "max": return Model.isInIntervalOrEqual(actual, null, null, expected);
			case "equal": return Model.isInIntervalOrEqual(actual, expected);
			default: return true;
		}
	}

	static isInIntervalOrEqual(val, valProp, minProp, maxProp) {
		if(valProp || minProp || maxProp)
			return CommonUtil.isInIntervalOrEqual(val, valProp, minProp, maxProp);

		return true;
	}
}

export default Model;