import Model from "./model.js";
import { DeviceUtil } from "../apis";

class Device extends Model {
	constructor(expected) {
		super(expected);
	}

	debug(identifierName) {
		console.log(
			`📱 DEVICE LOGS for ${identifierName}:\n`,
			`	👉 📱 Device Width (css pixels): ${DeviceUtil.width} dip\n`,
			`	👉 📱 Device Height (css pixels): ${DeviceUtil.height} dip\n`,
			`	👉 📱 Device Width (physical pixels): ${DeviceUtil.physicalWidth} px\n`,
			`	👉 📱 Device Height (physical pixels): ${DeviceUtil.physicalHeight} px\n`,
			`	👉 📱 Device Pixel Ratio: ${DeviceUtil.pixelRatio}\n\n`,
			`	👉 📱 props.deviceWidth: ${this.expected.deviceWidth} px\n`,
			`	👉 📱 props.minDeviceWidth: ${this.expected.minDeviceWidth} px\n`,
			`	👉 📱 props.maxDeviceWidth: ${this.expected.maxDeviceWidth} px\n`,
			`	👉 📱 props.deviceHeight: ${this.expected.deviceHeight} px\n`,
			`	👉 📱 props.minDeviceHeight: ${this.expected.minDeviceHeight} px\n`,
			`	👉 📱 props.maxDeviceHeight: ${this.expected.maxDeviceHeight} px\n`,
			`	👉 📱 props.devicePixelRatio: ${this.expected.devicePixelRatio}\n`,
			`	👉 📱 props.minDevicePixelRatio: ${this.expected.minDevicePixelRatio}\n`,
			`	👉 📱 props.maxDevicePixelRatio: ${this.expected.maxDevicePixelRatio}\n`,
		);
	}

	isValid() {
		return this.isValidWidth(this.expected) && this.isValidHeight(this.expected) && this.isValidPixelRatio(this.expected);
	}

	isValidWidth(expected) {
		return Device.isInIntervalOrEqual(DeviceUtil.width, expected.deviceWidth, expected.minDeviceWidth, expected.maxDeviceWidth);
	}

	isValidHeight(expected) {
		return Device.isInIntervalOrEqual(DeviceUtil.height, expected.deviceHeight, expected.minDeviceHeight, expected.maxDeviceHeight);
	}

	isValidPixelRatio(expected) {
		return Device.isInIntervalOrEqual(DeviceUtil.pixelRatio, expected.devicePixelRatio, expected.minDevicePixelRatio, expected.maxDevicePixelRatio);
	}

	static isValidWidthFromOperator(operator, expectedWidth) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedWidth, DeviceUtil.width);
	}

	static isValidHeightFromOperator(operator, expectedHeight) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedHeight, DeviceUtil.height);
	}

	static isValidPixelRatioFromOperator(operator, expectedPixelRatio) {
		return Device.isInIntervalOrEqualFromOperator(operator, expectedPixelRatio, DeviceUtil.pixelRatio);
	}

	static get information() {
		return [
			`👉 📱 Device Width (css pixels): ${DeviceUtil.width} dip`,
			`👉 📱 Device Height (css pixels): ${DeviceUtil.height} dip`,
			`👉 📱 Device Width (physical pixels): ${DeviceUtil.physicalWidth} px`,
			`👉 📱 Device Height (physical pixels): ${DeviceUtil.physicalHeight} px`,
			`👉 📱 Device Pixel Ratio: ${DeviceUtil.pixelRatio}`
		];
	}
}

export default Device;
