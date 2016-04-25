import React from "react";
import {
	Dimensions,
	PixelRatio,
	View,
	Text
} from "react-native";

class ResponsiveLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//On exprimera la hauteur et la largeur suivant deux unités de mesures: le pixel et le dp:
			//pixel = dimensions réelles et dp = dimensions "virtuelles":
			pxHeight: 0,
			pxWidth: 0,
			//dp = Density Independent pixel (px = dp * (dpi / 160) = dp * pixel ratio (si pixel ratio = 2, 1dp = 2px))
			//(cf. http://developer.android.com/guide/practices/screens_support.html)
			dpHeight: 0,
			dpWidth: 0
		};
		//Le pixel ratio est immutable: on peut donc
		//l'initialiser une fois dans le constructor (afin d'éviter des calls inutile au getter à chaque rendering):
		this.pixelRatio = PixelRatio.get();

		//Binding des fonctions au contexte this:
		this.onLayout = this.onLayout.bind(this);
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
		console.log(event.nativeEvent.layout, Dimensions.get("window"));
		this.setState({
			pxHeight: event.nativeEvent.layout.height * this.pixelRatio,
			pxWidth: event.nativeEvent.layout.width * this.pixelRatio,
			dpHeight: event.nativeEvent.layout.height,
			dpWidth: event.nativeEvent.layout.width
		});
	}

	render() {
		return (
			<View style={this.props.style} onLayout={this.onLayout}>
				<Text>
					Debug => {(() => {
						return "Container Virtual Height = " + this.state.dpHeight + " Container Virtual Width = " + this.state.dpWidth
							+ " Container Real Height = " + this.state.pxHeight + " Container Real Width = " + this.state.pxWidth
							+ " Screen Height = " + Dimensions.get("window").height + " Screen Width = " + Dimensions.get("window").width
							+ " Pixel Ratio = " + this.pixelRatio;
					})()}
				</Text>

				{this.props.children}
			</View>
		);
	}
}

ResponsiveLayout.propTypes = {
	children: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.arrayOf(React.PropTypes.element)
	]),
	//this.props.style stocke l'id référant l'objet style généré par StyleSheet.create():
	style: React.PropTypes.number
};

export default ResponsiveLayout;
