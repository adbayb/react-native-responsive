import {
	Dimensions,
	PixelRatio
} from "react-native";

class Helper {
	//Device dimensions services:

	//En statique pour éviter des call répétitifs vers les getters Dimensions et PixelRatio:
	static pixelRatio = PixelRatio.get();
	//Les Dimensions initiales sont settées avant runApplication(). On peut donc les getter en statique dans un service.
	//On peut ainsi stocke la résolution (hauteur, largeur) du device et que cette dernière
	//ne change pas au cours du temps (sinon wtf :))
	//Cependant, Dimensions.get récupère la résolution du screen à un instant t: elle donnera des valeurs différentes
	//suivant si screen en mode portrait ou paysage: étant donné que le nombre de pixel en hauteur est toujours plus
	//important qu'en largeur (screen ratio généralement 4:3 ou 16:9), on utilise la fonction max et min de la lib Math
	//pour assigner notre hauteur et largeur de façon immutable (indépendemment donc de la résolution):
	//On exprimera la hauteur et la largeur suivant deux unités de mesures: le pixel et le dp:
	//pixel = dimensions réelles et dp = dimensions "virtuelles":
	//dp (ou dip) = Density Independent pixel (px = dp * (dpi / 160) = dp * pixel ratio (si pixel ratio = 2, 1dp = 2px))
	//(cf. http://developer.android.com/guide/practices/screens_support.html)
	//Ici en dp (<=> dip): css pixels:
	static dipDeviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height);
	static dipDeviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height);
	//Ici en px: physical pixels:
	static pxDeviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	static pxDeviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	//Par défault, deviceWidth fait référence à pxDeviceWidth. 
	//On peut donc y accéder soit via Helper.deviceWidth ou via Helper.pxDeviceWidth:
	static get physicalDeviceWidth() {
		return Helper.pxDeviceWidth;
	}
	static get physicalDeviceHeight() {
		return Helper.pxDeviceHeight;
	}
	static get cssDeviceWidth() {
		return Helper.dipDeviceWidth;
	}
	static get cssDeviceHeight() {
		return Helper.dipDeviceHeight;
	}
	//Par défaut, les dimensions device sont exprimés en css pixels:
	static get deviceWidth() {
		return Helper.cssDeviceWidth;
	}
	static get deviceHeight() {
		return Helper.cssDeviceHeight;
	}

	static isInInterval(x, min, max) {
		if(x) {
			if(min && max) {
				return x >= min && x <= max;
			} else { //Dans le cas où seulement un min ou un max est spécifié:
				if(min)
					return x >= min;

				if(max)
					return x <= max;
			}
		}

		return false;
	}

	/**
	 * Check if x === y or x >= min && x <= max:
	 **/
	static isInIntervalOrEqual(x, y, min, max) {
		//Les falsy values en Javascript correspondent à undefined, null, false, 0, ""...
		//donc inutile de faire un call sur hasOwnProperty, il suffit simplement de
		//checker si la condition est true (par exemple, si la variable est undefined, la condition sera false):

		//La vérification sur Equal a une importance plus élévée que la vérification sur
		//l'intervalle. On le teste en premier:
		if(y)
			return x === y;
		else {
			if(min || max)
				return Helper.isInInterval(x, min, max);
		}

		return false;
	}

	static debounce(callback, delay) {
		let timer;
		return () => {
			console.log(timer);
			clearTimeout(timer);
			console.log(timer);
			timer = setTimeout(
				callback,
				delay
			);
		};
	}
}

export default Helper;
