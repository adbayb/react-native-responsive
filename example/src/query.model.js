import { Helper } from "./services";

class Model {
	//expected contiendra l'ensemble des contraintes spécifié par l'utilisateur soit via les props (composant) soit via un objet (dans le cas des décorateurs).
	constructor(expected) {
		this.expected = expected;
	}

	//VALIDATIONS DES CONTRAINTES DE TAILLES SPECIFIQUES AU HARDWARE (immutables):
	isValidDevice() {
		//console.log("isValid()", this.isValidDeviceWidth(width), this.isValidDeviceHeight(height), this.isValidDevicePixelRatio(pixelRatio));
		return this.isValidDeviceWidth(this.expected) && this.isValidDeviceHeight(this.expected) && this.isValidDevicePixelRatio(this.expected);
	}

	isValidDeviceWidth(expected) {
		return Model.isInIntervalOrEqual(Helper.pxDeviceWidth, expected.deviceWidth, expected.minDeviceWidth, expected.maxDeviceWidth);
	}

	isValidDeviceHeight(expected) {
		return Model.isInIntervalOrEqual(Helper.pxDeviceHeight, expected.deviceHeight, expected.minDeviceHeight, expected.maxDeviceHeight);
	}

	isValidDevicePixelRatio(expected) {
		return Model.isInIntervalOrEqual(Helper.pixelRatio, expected.pixelRatio, expected.minPixelRatio, expected.maxPixelRatio);
	}

	static isValidDeviceWidthFromOperator(operator, expectedWidth) {
		switch(operator) {
			case "min": return Model.isInIntervalOrEqual(Helper.pxDeviceWidth, null, expectedWidth);
			case "max": return Model.isInIntervalOrEqual(Helper.pxDeviceWidth, null, null, expectedWidth);
			case "equal": return Model.isInIntervalOrEqual(Helper.pxDeviceWidth, expectedWidth);
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
}

export default Model;
