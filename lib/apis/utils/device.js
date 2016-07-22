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
	static dipDeviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height);
	static dipDeviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height);
	//Ici en px: physical pixels:
	static pxDeviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	static pxDeviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * PixelRatio.get();
	//Par défault, deviceWidth fait référence à pxDeviceWidth. 
	//On peut donc y accéder soit via Device.deviceWidth ou via Device.pxDeviceWidth:
	static get physicalDeviceWidth() {
		return Device.pxDeviceWidth;
	}
	static get physicalDeviceHeight() {
		return Device.pxDeviceHeight;
	}
	static get cssDeviceWidth() {
		return Device.dipDeviceWidth;
	}
	static get cssDeviceHeight() {
		return Device.dipDeviceHeight;
	}
	//Par défaut, les dimensions device sont exprimés en css pixels:
	static get deviceWidth() {
		return Device.cssDeviceWidth;
	}
	static get deviceHeight() {
		return Device.cssDeviceHeight;
	}
}

export default Device;
