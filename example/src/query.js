import React from "react";
import { Helper, CustomPropTypes, InjectEventEmitter } from "./services";

@InjectEventEmitter("MediaQueryWrapper", "MediaQueryEvent")
class MediaQuery extends React.Component {
	//cf. https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries#Pseudo-BNF_(pour_ceux_qui_aiment_ce_genre_de_choses)
	//Pour des examples de configurations Media Query suivant les appareils:
	//cf. https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
	static propTypes = {
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

		orientation: React.PropTypes.oneOf(["landscape", "portrait"]) //Experimental !
	};

	static isInIntervalOrEqual(val, valProp, minProp, maxProp) {
		if(valProp || minProp || maxProp)
			return Helper.isInIntervalOrEqual(val, valProp, minProp, maxProp);

		//Par défault, si aucune propriété n'est spécifiée, on considère
		//la valeur comme valide par défaut (pour permettre l'affichage des enfants):
		return true;
	}

	constructor(props) {
		super(props);

		this.state = {
			//deviceWidth: Helper.pxDeviceWidth,
			//deviceHeight: Helper.pxDeviceHeight,
			//devicePixelRatio: Helper.pixelRatio,
			isValidDevice: this.isValidDevice(
				Helper.pxDeviceWidth,
				Helper.pxDeviceHeight,
				Helper.pixelRatio
			),
			//Par défaut, true dans le cas où il n'y a pas de MediaQueryStore
			//afin d'autoriser l'affichage des enfants (cf. render()):
			isValidStore: true
		};

		this.onReceivedEvent = this.onReceivedEvent.bind(this);
	}

	//VALIDATIONS DES CONTRAINTES DYNAMIQUES ECOUTEES PAR MediaQueryStore
	onReceivedEvent(data) {
		//console.log("Query orientation", data, this.props.orientation);
		if(this.props.orientation) {
			let isValidStore = (this.props.orientation === data.orientation);
			//Pour éviter les render inutiles://TODO: dans shouldComponentUpdate !
			let needUpdate = this.state.isValidStore !== isValidStore;

			if(needUpdate)
				this.setState({
					isValidStore: isValidStore
				});
		}
	}

	//VALIDATIONS DES CONTRAINTES DE TAILLES SPECIFIQUES AU HARDWARE (immutables):
	isValidDevice(width, height, pixelRatio) {
		//console.log("isValid()", this.isValidDeviceWidth(width), this.isValidDeviceHeight(height), this.isValidDevicePixelRatio(pixelRatio));

		return this.isValidDeviceWidth(width) && this.isValidDeviceHeight(height) && this.isValidDevicePixelRatio(pixelRatio);
	}

	isValidDeviceWidth(width) {
		return MediaQuery.isInIntervalOrEqual(width, this.props.deviceWidth, this.props.minDeviceWidth, this.props.maxDeviceWidth);
	}

	isValidDeviceHeight(height) {
		return MediaQuery.isInIntervalOrEqual(height, this.props.deviceHeight, this.props.minDeviceHeight, this.props.maxDeviceHeight);
	}

	isValidDevicePixelRatio(pixelRatio) {
		return MediaQuery.isInIntervalOrEqual(pixelRatio, this.props.pixelRatio, this.props.minPixelRatio, this.props.maxPixelRatio);
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

		console.log("RENDER");

		if(this.state.isValidDevice) {
			if(this.state.isValidStore)
				return this.props.children;
		}
		//Retourner null est une indication explicite à React de ne rien afficher:
		return null;
	}
}

export default MediaQuery;
