class PropTypes {
	static childrenValidator(props, propName, componentName) {
		//Gestion des erreurs sous forme de warning sous react-native via TrasformError:
		if(typeof(props[propName]) !== "object") {
			return new Error(
				"Invalid prop '" + propName + "' supplied to '" +
				componentName + "': A valid JSX element must be provided."
			);
		} else {
			//en javascript, un array est un aussi un object. typeof ne fait pas la distinction entre array et object, instanceof le permet:
			if(props[propName] instanceof Array) {
				return new Error(
					"Invalid prop '" + propName + "' supplied to '" +
					componentName + "': Adjacent JSX elements must be wrapped in an enclosing tag."

				);
			}
		}
		//On retourne null si aucune erreur:
		return null;
	}
}

export default PropTypes;
