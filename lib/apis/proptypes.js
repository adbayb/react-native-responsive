class PropTypes {
	static childrenValidator(props, propName, componentName) {
		if(typeof(props[propName]) !== "object") {
			return new Error(
				"Invalid prop '" + propName + "' supplied to '" +
				componentName + "': A valid JSX element must be provided."
			);
		} else {
			if(props[propName] instanceof Array) {
				return new Error(
					"Invalid prop '" + propName + "' supplied to '" +
					componentName + "': Adjacent JSX elements must be wrapped in an enclosing tag."

				);
			}
		}
		
		return null;
	}
}

export default PropTypes;
