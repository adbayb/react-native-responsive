import {
	Dimensions,
	PixelRatio
} from "react-native";

class Device {
	static pixelRatio = PixelRatio.get();
	static dpWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height);
	static dpHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height);
	static pxWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	static pxHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();

	static get physicalWidth() {
		return Device.pxWidth;
	}

	static get physicalHeight() {
		return Device.pxHeight;
	}

	static get cssWidth() {
		return Device.dpWidth;
	}

	static get cssHeight() {
		return Device.dpHeight;
	}

	static get width() {
		return Device.cssWidth;
	}
	
	static get height() {
		return Device.cssHeight;
	}
}

export default Device;
