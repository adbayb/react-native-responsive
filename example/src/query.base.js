import { Helper } from "./services";

class MediaQueryBase {
	//expected contiendra l'ensemble des contraintes spécifié par l'utilisateur soit via les props (composant) soit via un objet (dans le cas des décorateurs).
	constructor(expected) {
		this.expected = expected;
	}

	//VALIDATIONS DES CONTRAINTES DE TAILLES SPECIFIQUES AU HARDWARE (immutables):
	isValidDevice() {
		//console.log("isValid()", this.isValidDeviceWidth(width), this.isValidDeviceHeight(height), this.isValidDevicePixelRatio(pixelRatio));
		return this.isValidDeviceWidth(this.expected, Helper.pxDeviceWidth) && this.isValidDeviceHeight(this.expected, Helper.pxDeviceHeight) && this.isValidDevicePixelRatio(this.expected, Helper.pixelRatio);
	}

	isValidDeviceWidth(expected, measured) {
		return MediaQueryBase.isInIntervalOrEqual(measured, expected.deviceWidth, expected.minDeviceWidth, expected.maxDeviceWidth);
	}

	isValidDeviceHeight(expected, measured) {
		return MediaQueryBase.isInIntervalOrEqual(measured, expected.deviceHeight, expected.minDeviceHeight, expected.maxDeviceHeight);
	}

	isValidDevicePixelRatio(expected, measured) {
		return MediaQueryBase.isInIntervalOrEqual(measured, expected.pixelRatio, expected.minPixelRatio, expected.maxPixelRatio);
	}

	static isInIntervalOrEqual(val, valProp, minProp, maxProp) {
		if(valProp || minProp || maxProp)
			return Helper.isInIntervalOrEqual(val, valProp, minProp, maxProp);

		//Par défault, si aucune propriété n'est spécifiée, on considère
		//la valeur comme valide par défaut (pour permettre l'affichage des enfants):
		return true;
	}
}

export default MediaQueryBase;
