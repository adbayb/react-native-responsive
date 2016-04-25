import React from "react";
import {
	Dimensions,
	PixelRatio,
	View
} from "react-native";

class MediaQuery extends React.Component {
	constructor(props) {
		super(props);

		//Pour le moment, le caractère responsive se basera sur des propriétés immutables du screen device
		//(telle que la résolution ou le pixel ratio).
		//Pour des examples de configurations Media Query suivant les appareils:
		//cf. https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
		this.pixelRatio = PixelRatio.get();
		//Les Dimensions initiales sont settées avant runApplication(). On peut donc les getter dans le constructeur
		//On peut ainsi stocke la résolution (hauteur, largeur) du device et que cette dernière
		//ne change pas au cours du temps (sinon wtf :))
		//Cependant, Dimensions.get récupère la résolution du screen à un instant t: elle donnera des valeurs différentes
		//suivant si screen en mode portrait ou paysage: étant donné que le nombre de pixel en hauteur est toujours plus
		//important qu'en largeur (screen ratio généralement 4:3 ou 16:9), on utilise la fonction max et min de la lib Math
		//pour assigner notre hauteur et largeur de façon immutable (indépendemment donc de la résolution):
		this.deviceWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * this.pixelRatio;
		this.deviceHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * this.pixelRatio;

		this.isDisplayed = this.isValidDeviceDimensions() && this.isValidPixelRatio();
	}

	isValidDeviceDimensions() {
		//TODO: gérer undefined:
		if(this.props.deviceWidth !== this.deviceWidth
			|| this.props.deviceHeight !== this.deviceHeight
			|| this.props.minDeviceWidth > this.deviceWidth
			|| this.props.maxDeviceWidth < this.deviceWidth
			|| this.props.minDeviceHeight > this.deviceHeight
			|| this.props.maxDeviceHeight < this.deviceHeight) {
				return false;
		}

		return true;
	}

	isValidPixelRatio() {
		//TODO: gérer undefined:
		if(this.props.minPixelRatio > this.pixelRatio
			||this.props.maxPixelRatio < this.pixelRatio) {
				return false;
		}

		return true;
	}

	render() {
		console.log(
			this.props.minDeviceWidth, this.props.maxDeviceWidth,
			this.props.minDeviceHeight, this.props.maxDeviceHeight,
			this.deviceWidth, this.deviceHeight,
			this.pixelRatio, this.isDisplayed
		);
		if(this.isDisplayed) {
			return (
				<View style={this.props.style} onLayout={this.onLayout}>
					{this.props.children}
				</View>
			);
		}
		//Retourner null est une indication explicite à React de ne rien afficher:
		return null;
	}
}

//cf. https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries#Pseudo-BNF_(pour_ceux_qui_aiment_ce_genre_de_choses)
//TODO: Gérer orientation dans une future version:
MediaQuery.propTypes = {
	style: React.PropTypes.number,
	children: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.arrayOf(React.PropTypes.element)
	]),
	deviceWidth: React.PropTypes.number,
	minDeviceWidth: React.PropTypes.number,
	maxDeviceWidth: React.PropTypes.number,
	deviceHeight: React.PropTypes.number,
	minDeviceHeight: React.PropTypes.number,
	maxDeviceHeight: React.PropTypes.number,
	pixelRatio: React.PropTypes.number,
	minPixelRatio: React.PropTypes.number,
	maxPixelRatio: React.PropTypes.number
};

export default MediaQuery;
