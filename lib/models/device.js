import Model from "./model.js";
import { DeviceUtil } from "../apis";

class Device extends Model {
	//expected contiendra l'ensemble des contraintes spécifié par l'utilisateur soit via les props (composant) soit via un objet (dans le cas des décorateurs).
	constructor(expected) {
		super(expected);
	}

	debug(identifierName) {
		console.log(
			`📱 DEVICE LOGS for ${identifierName}:\n`,
			`	👉 📱 Device Width (css pixels): ${DeviceUtil.deviceWidth} dip\n`,
			`	👉 📱 Device Height (css pixels): ${DeviceUtil.deviceHeight} dip\n`,
			`	👉 📱 Device Width (physical pixels): ${DeviceUtil.physicalDeviceWidth} px\n`,
			`	👉 📱 Device Height (physical pixels): ${DeviceUtil.physicalDeviceHeight} px\n`,
			`	👉 📱 Device Pixel Ratio: ${DeviceUtil.pixelRatio}\n\n`,
			`	👉 📱 props.deviceWidth: ${this.expected.deviceWidth} px\n`,
			`	👉 📱 props.minDeviceWidth: ${this.expected.minDeviceWidth} px\n`,
			`	👉 📱 props.maxDeviceWidth: ${this.expected.maxDeviceWidth} px\n`,
			`	👉 📱 props.deviceHeight: ${this.expected.deviceHeight} px\n`,
			`	👉 📱 props.minDeviceHeight: ${this.expected.minDeviceHeight} px\n`,
			`	👉 📱 props.maxDeviceHeight: ${this.expected.maxDeviceHeight} px\n`,
			`	👉 📱 props.pixelRatio: ${this.expected.pixelRatio}\n`,
			`	👉 📱 props.minPixelRatio: ${this.expected.minPixelRatio}\n`,
			`	👉 📱 props.maxPixelRatio: ${this.expected.maxPixelRatio}\n`,
		);
	}

	//VALIDATIONS DES CONTRAINTES DE TAILLES SPECIFIQUES AU HARDWARE (immutables):
	isValid() {
		return this.isValidWidth(this.expected) && this.isValidHeight(this.expected) && this.isValidPixelRatio(this.expected);
	}

	isValidWidth(expected) {
		return Device.isInIntervalOrEqual(DeviceUtil.deviceWidth, expected.deviceWidth, expected.minDeviceWidth, expected.maxDeviceWidth);
	}

	isValidHeight(expected) {
		return Device.isInIntervalOrEqual(DeviceUtil.deviceHeight, expected.deviceHeight, expected.minDeviceHeight, expected.maxDeviceHeight);
	}

	isValidPixelRatio(expected) {
		return Device.isInIntervalOrEqual(DeviceUtil.pixelRatio, expected.pixelRatio, expected.minPixelRatio, expected.maxPixelRatio);
	}

	static isValidWidthFromOperator(operator, expectedWidth) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedWidth, DeviceUtil.deviceWidth);
	}

	static isValidHeightFromOperator(operator, expectedHeight) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedHeight, DeviceUtil.deviceHeight);
	}

	static isValidPixelRatioFromOperator(operator, expectedPixelRatio) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedPixelRatio, DeviceUtil.pixelRatio);
	}

	static get information() {
		return [
			`👉 📱 Device Width (css pixels): ${DeviceUtil.deviceWidth} dip`,
			`👉 📱 Device Height (css pixels): ${DeviceUtil.deviceHeight} dip`,
			`👉 📱 Device Width (physical pixels): ${DeviceUtil.physicalDeviceWidth} px`,
			`👉 📱 Device Height (physical pixels): ${DeviceUtil.physicalDeviceHeight} px`,
			`👉 📱 Device Pixel Ratio: ${DeviceUtil.pixelRatio}`
		];
	}
}

export default Device;
