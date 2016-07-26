import { StyleSheet as RNStyleSheet } from "react-native";
import { StyleSheetUtil } from "./utils";
import { Device } from "../models";

class StyleSheet extends StyleSheetUtil {
	static featuresCheckers = {
		//TODO: dans query.model.js créer fonction statique de vérification
		//width et height avec un param du type "min", "max", "equal" pour effectuer
		//l'opération de vérification adéquate
		/*(width) => {
			return Device.isValidWidthFromOperator("equal", width);
		} est équivalent à (width) => Device.isValidWidthFromOperator("equal", width) 
		(return implicite sur une expression)*/
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

	static create(base, medias) {
		if(medias) {
			for(let property in medias) {
				if(/@media/.test(property)) {
					if(StyleSheet.isValidRule(property)) {
						//Merge media properties with base ones:
						StyleSheet.merge(base, medias[property]);
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
			//Suivant le type de feature (check sur la clé), affecter le validateur associé
			//(pour le moment un seul validateur sur les propriétés taille):
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

/*console.time("performance_test");
let media = StyleSheet.create({
	test: {
		width: "200"
	},
	"@media (min-device-width: 100px) and (max-device-height: 100px) and (device-pixel-ratio: 1.5)": {
		test: {
			width: "400",
			height: "200",
			display: "flex"
		}
	},
	"@media (min-device-width: 200px) and (max-device-height: 100px)": {
		display: "flex"
	}
});
console.log(media);
console.timeEnd("performance_test");*/
