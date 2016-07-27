import {
	Dimensions,
	PixelRatio
} from "react-native";

class Device {
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
	static dpWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height);
	static dpHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height);
	//Ici en px: physical pixels:
	static pxWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	static pxHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	//Par défault, width fait référence à dipWidth. 
	//On peut donc y accéder soit via Device.width ou via Device.pxWidth:
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
	//Par défaut, les dimensions device sont exprimés en css pixels:
	static get width() {
		return Device.cssWidth;
	}
	static get height() {
		return Device.cssHeight;
	}
}

export default Device;
