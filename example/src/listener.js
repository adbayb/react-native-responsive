import React from "react";
import {
	View
} from "react-native";
import { Service } from "./api";

class Listener extends React.Component {
	constructor(props) {
		super(props);
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
			height: event.nativeEvent.layout.height,
			orientation: (event.nativeEvent.layout.width === Service.dpDeviceWidth) ? "portrait" : "landscape"
		}, () => {
			console.log(this.state);
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
}

Listener.propTypes = {
	...View.propTypes
};

export default Listener;
