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

export default Model;