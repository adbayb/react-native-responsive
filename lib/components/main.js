import React from "react";
import { Device } from "../models";
import { CustomPropTypes } from "../apis";

class Main extends React.Component {
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
		//In css pixels:
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
	};

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

	componentDidMount() {
		//Inutile de faire l'affichage du debug Device à chaque render() 
		//étant donné que les propriétés hardware sont immutables:
		if(this.props.debug)
			this.device.debug(Main.displayName);
	}

	render() {
		if(this.state.isVisible)
			return this.props.children;
		//Retourner null est une indication explicite à React de ne rien afficher:
		return null;
	}
}

export default Main;
