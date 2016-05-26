import React from "react";
import { Helper, CustomPropTypes, InjectEventEmitter } from "./services";

@InjectEventEmitter("MediaQueryWrapper", "MediaQueryEvent")
class MediaQuery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 0,
			height: 0,
			//La vérification des contraintes devices se font dans le constructeur
			//puisqu'elles se basent sur des propriétés immutables du screen device
			//(telle que la résolution ou le pixel ratio):
			//Pour des examples de configurations Media Query suivant les appareils:
			//cf. https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
			isVisible: this.isValidDevice(
				Helper.pxDeviceWidth,
				Helper.pxDeviceHeight,
				Helper.pixelRatio
			)
		};
	}

	onReceivedEvent(orientation) {
		console.log("Query orientation", orientation);
	}

	//VALIDATIONS DES CONTRAINTES DE TAILLES SPECIFIQUES AU HARDWARE (immutables):
	isValidDevice(width, height, pixelRatio) {
		//console.log("isValid()", this.isValidDeviceWidth(width), this.isValidDeviceHeight(height), this.isValidDevicePixelRatio(pixelRatio));

		return this.isValidDeviceWidth(width) && this.isValidDeviceHeight(height) && this.isValidDevicePixelRatio(pixelRatio);
	}

	isValidDeviceWidth(width) {
		//Les falsy values en Javascript correspondent à undefined, null, false, 0, ""...
		//donc inutile de faire un call sur hasOwnProperty, il suffit simplement de
		//checker si la condition est true (par exemple, si la variable est undefined, la condition sera false):

		//La prop deviceWidth a une importance plus élévée que min et max, on le test en premier:
		if(this.props.deviceWidth)
			return this.props.deviceWidth === width;
		else {
			let min = this.props.minDeviceWidth;
			let max = this.props.maxDeviceWidth;

			if(min || max)
				return Helper.isInInterval(width, min, max);
		}

		//Par défault, si aucune propriété width n'est spécifiée,
		//on considère la largeur comme valide (pour permettre l'affichage des enfants par défaut):
		return true;
	}

	isValidDeviceHeight(height) {
		if(this.props.deviceHeight)
			return this.props.deviceHeight === height;
		else {
			let min = this.props.minDeviceHeight;
			let max = this.props.maxDeviceHeight;

			if(min || max)
				return Helper.isInInterval(height, min, max);
		}

		return true;
	}

	isValidDevicePixelRatio(pixelRatio) {
		if(this.props.pixelRatio)
			return this.props.pixelRatio === pixelRatio;
		else {
			let min = this.props.minPixelRatio;
			let max = this.props.maxPixelRatio;

			if(min || max)
				return Helper.isInInterval(pixelRatio, min, max);
		}

		return true;
	}

	render() {
		/*
		console.log(this);
		console.log(
			"render()\n",
			"this.props.minDeviceWidth = " + this.props.minDeviceWidth + "\n",
			"this.props.maxDeviceWidth = " + this.props.maxDeviceWidth + "\n",
			"this.props.minDeviceHeight = " + this.props.minDeviceHeight + "\n",
			"this.props.maxDeviceHeight = " + this.props.maxDeviceHeight + "\n",
			"pxDeviceWidth = " + Service.pxDeviceWidth + "\n",
			"pxDeviceHeight = " + Service.pxDeviceHeight + "\n",
			"pixelRatio = " + Service.pixelRatio + "\n",
			"this.state.isVisible = " + this.state.isVisible
		);
		*/

		if(this.state.isVisible) {
			return this.props.children;
		}
		//Retourner null est une indication explicite à React de ne rien afficher:
		return null;
	}
}

//cf. https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries#Pseudo-BNF_(pour_ceux_qui_aiment_ce_genre_de_choses)
MediaQuery.propTypes = {
	style: React.PropTypes.number,
	/*children: React.PropTypes.oneOfType([
		React.PropTypes.element
		//MediaQuery n'est pas un container d'élément d'où le fait qu'il ne prend pas de tableau d'éléments:
		//React.PropTypes.arrayOf(React.PropTypes.element)
	]),*/
	children: CustomPropTypes.childrenValidator,
	//Hardware Device Constraints:
	deviceWidth: React.PropTypes.number,
	minDeviceWidth: React.PropTypes.number,
	maxDeviceWidth: React.PropTypes.number,
	deviceHeight: React.PropTypes.number,
	minDeviceHeight: React.PropTypes.number,
	maxDeviceHeight: React.PropTypes.number,
	pixelRatio: React.PropTypes.number,
	minPixelRatio: React.PropTypes.number,
	maxPixelRatio: React.PropTypes.number,

	orientation: React.PropTypes.oneOf(["landscape", "portrait"]), //En privé (transmis par responsivelayout)
	onOrientation: React.PropTypes.func
};

MediaQuery.defaultProps = {
	//orientation: "portrait"
};

export default MediaQuery;
