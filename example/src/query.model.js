import { Helper } from "./services";

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
			return Helper.isInIntervalOrEqual(val, valProp, minProp, maxProp);

		//Par défault, si aucune propriété n'est spécifiée, on considère
		//la valeur comme valide par défaut (pour permettre l'affichage des enfants):
		return true;
	}

	/*
	NB: pour simuler une variable privée sous ES2015, utilisation de Symbol qui permet d'attribuer un identifiant unique 
	non accessible depuis le scope extérieur sans réflexion (cf. Reflect). Exemple de privatisation d'une variable:
	var privateVariable = Symbol();
	class Test {
		constructor(){
			this[privateVariable] = "test";
		}
	}
	var instance = new Test();
	console.log(instance.privateVariable); //=> undefined depuis l'extérieur (seulement accessible 
	depuis l'intérieur de la classe via l'opérateur d'objet this)
	*/
}

class Device extends Model {
	//expected contiendra l'ensemble des contraintes spécifié par l'utilisateur soit via les props (composant) soit via un objet (dans le cas des décorateurs).
	constructor(expected) {
		super(expected);
	}

	//VALIDATIONS DES CONTRAINTES DE TAILLES SPECIFIQUES AU HARDWARE (immutables):
	isValid() {
		return this.isValidWidth(this.expected) && this.isValidHeight(this.expected) && this.isValidPixelRatio(this.expected);
	}

	isValidWidth(expected) {
		return Device.isInIntervalOrEqual(Helper.deviceWidth, expected.deviceWidth, expected.minDeviceWidth, expected.maxDeviceWidth);
	}

	isValidHeight(expected) {
		return Device.isInIntervalOrEqual(Helper.deviceHeight, expected.deviceHeight, expected.minDeviceHeight, expected.maxDeviceHeight);
	}

	isValidPixelRatio(expected) {
		return Device.isInIntervalOrEqual(Helper.pixelRatio, expected.pixelRatio, expected.minPixelRatio, expected.maxPixelRatio);
	}

	static isValidWidthFromOperator(operator, expectedWidth) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedWidth, Helper.deviceWidth);
	}

	static isValidHeightFromOperator(operator, expectedHeight) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedHeight, Helper.deviceHeight);
	}

	static isValidPixelRatioFromOperator(operator, expectedPixelRatio) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedPixelRatio, Helper.pixelRatio);
	}
}

export {
	Device
};
