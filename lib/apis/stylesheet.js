import { StyleSheet as RNStyleSheet } from "react-native";
import { StyleSheetUtil } from "./utils";
import { Device } from "../models";

class StyleSheet extends StyleSheetUtil {
	static featuresCheckers = {
		"device-width": (w) => Device.isValidWidthFromOperator("equal", w),
		"min-device-width": (w) => Device.isValidWidthFromOperator("min", w),
		"max-device-width": (w) => Device.isValidWidthFromOperator("max", w),
		"device-height": (h) => Device.isValidHeightFromOperator("equal", h),
		"min-device-height": (h) => Device.isValidHeightFromOperator("min", h),
		"max-device-height": (h) => Device.isValidHeightFromOperator("max", h),
		"device-pixel-ratio": (pr) => Device.isValidPixelRatioFromOperator("equal", pr),
		"min-device-pixel-ratio": (pr) => Device.isValidPixelRatioFromOperator("min", pr),
		"max-device-pixel-ratio": (pr) => Device.isValidPixelRatioFromOperator("max", pr)
	};

	static create(base, rules) {
		if(rules) {
			for(let property in rules) {
				if(/@media/.test(property)) {
					if(StyleSheet.isValidRule(property)) {
						StyleSheet.merge(base, rules[property]);
					}
				}
			}
		}

		return RNStyleSheet.create(base);
	}

	static isValidRule(rule) {
		if(rule) {
			let matches = [];
			let reg = /\(([^()]+)\)/g;

			let isValid = true;
			while((matches = reg.exec(rule)) && isValid) {
				isValid = StyleSheet.isValidFeature(matches[1]);
			}

			return isValid;
		}

		return false;
	}

	static isValidFeature(feature) {
		if(feature) {
			return StyleSheet.isValidSizeFeature(feature);
		}

		return false;
	}

	static isValidSizeFeature(feature) {
		let size = StyleSheet.parseSizeFeature(feature);

		if(size)
			return StyleSheet.featuresCheckers[size.key](size.value);

		return false;
	}

	static debug() {
		console.log("📱 DEVICE LOGS for MediaQueryStyleSheet:\n");
		Device.information.map((data) => {
			console.log("	" + data);
		});
	}
}

export default StyleSheet;
