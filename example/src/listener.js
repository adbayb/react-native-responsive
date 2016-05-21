import React from "react";
import {
	View
} from "react-native";
import EventEmitter from "EventEmitter";
import { Service } from "./api";

class MediaQueryListener extends React.Component {
	constructor(props) {
		super(props);

		this.eventEmitter = new EventEmitter();
	}

	onLayout(event) {
		/*
		Récupération de la taille de l'écran de deux manières:
		=> Soit via l'objet Dimensions:
			let {
				height,
				width
			} = Dimensions.get("window");
			Mais n'est pas updaté au cours du temps (rotation...) et renseigne seulement la taille
			de l'écran et ne peut retourner les dimensions effectives de notre container s'il ne
			prend pas la totalité de l'écran
		=> Soit via le callback onLayout sur View:
			Updater à chaque évènement de resizing (rotation...)
			+ permet de faire du responsive design sur une portion de l'écran (contexte de View).
			Dans le cas où notre container Responsive prend tout l'espace de l'écran, sa taille excluera toujours
			la taille de la status bar android (px= 24dp * pixel ratio (48px si pixel ration = 2)) et des bouttons
			de navigation android (px = 48 dp * pixel ration (96px dans le cas d'un pixel ratio de 2))
		*/
		this.setState({
			width: event.nativeEvent.layout.width,
			height: event.nativeEvent.layout.height
		}, () => {
			let orientation = (this.state.width > Service.dpDeviceWidth) ? "landscape" : "portrait";

			//let event = new CustomEvent("toto");
			//window.dispatchEvent(event);
			Service.eventEmitter.emit(Service.eventType, orientation);
		});
		//console.log("Event", event.nativeEvent.layout);
	}

	render() {
		return(
			<View {...this.props} onLayout={(event) => this.onLayout(event)}>
				{this.props.children}
			</View>
		);
	}

	/*
	renderChildren(children) {
		//cf. https://facebook.github.io/react/docs/top-level-api.html#react.children
		return React.Children.map(children, (child) => {
			//console.log(child.props);
			return React.cloneElement(child, {
				event: this.eventEmitter
			});
		});
	}

	render() {
		return (
			<View {...this.props} onLayout={(event) => this.onLayout(event)}>
				{this.renderChildren(this.props.children)}
			</View>
		);
	}
	*/
}

MediaQueryListener.propTypes = {
	...View.propTypes
};

export default MediaQueryListener;
