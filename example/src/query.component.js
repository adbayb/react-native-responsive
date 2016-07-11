import React from "react";
import { CustomPropTypes } from "./services";
import { Device } from "./query.model.js";
import Debug from "./query.debug.js";

class Component extends React.Component {
	//displayName est utilisé par react-native pour afficher les logs et warnings du composant
	//par défault, il vaut le nom de la classe du composant:
	static displayName = "MediaQuery";

	//cf. https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries#Pseudo-BNF_(pour_ceux_qui_aiment_ce_genre_de_choses)
	//Pour des examples de configurations Media Query suivant les appareils:
	//cf. https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
	static propTypes = {
		/*children: React.PropTypes.oneOfType([
			React.PropTypes.element
			//MediaQuery n'est pas un container d'élément d'où le fait qu'il ne prend pas de tableau d'éléments:
			//React.PropTypes.arrayOf(React.PropTypes.element)
		]),*/
		children: CustomPropTypes.childrenValidator,
		debug: React.PropTypes.bool,
		//Hardware Device Constraints:
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

	static defaultProps = {
		debug: false
	}

	constructor(props) {
		super(props);
		this.device = new Device(this.props);
		this.state = {
			//deviceWidth: Helper.pxDeviceWidth,
			//deviceHeight: Helper.pxDeviceHeight,
			//devicePixelRatio: Helper.pixelRatio,
			isVisible: this.device.isValid()
		};
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
		//console.log("RENDER");
		if(this.state.isVisible) {
			if(!this.props.debug)
				return this.props.children;
			else
				return (
					<Debug>
						{this.props.children}
					</Debug>
				);
		}

		//Retourner null est une indication explicite à React de ne rien afficher:
		return null;
	}
}

export default Component;
