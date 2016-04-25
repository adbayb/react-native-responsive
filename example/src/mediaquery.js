import React from "react";
import {
	Dimensions,
	PixelRatio,
	View
} from "react-native";

class MediaQuery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			orientation: "portrait",
			show: true
		};
		this.pixelRatio = PixelRatio.get();

		this.onLayout = this.onLayout.bind(this);
	}

	onLayout(event) {
		this.setState({
			height: event.nativeEvent.layout.height * this.pixelRatio,
			width: event.nativeEvent.layout.width * this.pixelRatio
		}, () => {
			//success callback:
			if(this.state.width < this.props.minWidth
				|| this.state.width > this.props.maxWidth) {
					this.setState({
						show: false
					});
			}
			else {
				this.setState({
					show: true
				});
			}
		});
	}

	hide() {
		//View est indispensable ici car c'est à part de son prop onLayout que l'on capte les
		//évènements liés à l'écran (changement d'orientation...):
		//flex: 0: on hide l'élément
		//TODO: Supprimer backgroundColor lors de la release (utile pour debug):
		return (
			<View style={{flex:0,backgroundColor:"#000000"}} onLayout={this.onLayout}/>
		);
	}

	render() {
		if(this.state.show) {
			return (
				<View style={this.props.style} onLayout={this.onLayout}>
					{this.props.children}
				</View>
			);
		}
		/*return (
			<View style={this.props.style} onLayout={this.onLayout}>
				{(() => {
					if(this.state.show)
						return this.props.children;
				})()}
			</View>
		);*/

		return this.hide();
	}
}

//cf. https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries#Pseudo-BNF_(pour_ceux_qui_aiment_ce_genre_de_choses)
MediaQuery.propTypes = {
	style: React.PropTypes.number,
	children: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.arrayOf(React.PropTypes.element)
	]),
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	minWidth: React.PropTypes.number,
	maxWidth: React.PropTypes.number,
	minHeight: React.PropTypes.number,
	maxHeight: React.PropTypes.number,
	//TODO: avec Dimensions:
	deviceWidth: React.PropTypes.number,
	deviceHeight: React.PropTypes.number,
	minDeviceWidth: React.PropTypes.number,
	maxDeviceWidth: React.PropTypes.number,
	minDeviceHeight: React.PropTypes.number,
	maxDeviceHeight: React.PropTypes.number,
	pixelRatio: React.PropTypes.number,
	minPixelRatio: React.PropTypes.number,
	maxPixelRatio: React.PropTypes.number,
	orientation: React.PropTypes.oneOf(["landscape", "portrait"])
};

export default MediaQuery;
