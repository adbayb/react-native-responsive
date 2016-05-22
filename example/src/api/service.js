import {
	Dimensions,
	PixelRatio
} from "react-native";
import EventEmitter from "EventEmitter";

class Service {
	//Event services:
	static eventEmitter = new EventEmitter();
	static eventType = "MediaQuery-OrientationChange";

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
	//dp = Density Independent pixel (px = dp * (dpi / 160) = dp * pixel ratio (si pixel ratio = 2, 1dp = 2px))
	//(cf. http://developer.android.com/guide/practices/screens_support.html)
	//Ici en dp:
	static dpDeviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height);
	static dpDeviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height);
	//Ici en px:
	static pxDeviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	static pxDeviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();

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

export default Service;
