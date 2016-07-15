/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import {
	AppRegistry,
	View,
	Text
} from "react-native";
import { MediaQuery, MediaQueryStylesheet, MediaQueryDebug } from "./src";
import {
	ListFragment,
	DetailFragment
} from "./components";
import listData from "./data";

class ReactNativeResponsive extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowData: {}
		};
	}

	onListClick(rowData) {
		this.setState({
			rowData: rowData
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListFragment style={styles.list} data={listData} onClick={this.onListClick.bind(this) }/>
				<DetailFragment style={styles.overview} empty={Object.keys(this.state.rowData).length <= 0}>
					<Text style={styles.text}> {this.state.rowData.subtitle} </Text>
					<Text style={styles.text}> {this.state.rowData.title} </Text>
					<Text style={styles.text}> {this.state.rowData.description} </Text>
					<MediaQuery debug={true} maxDeviceWidth={599}>
						<View style={{ marginTop: 10 }}>
							<Text> SMARTPHONE MEDIA QUERY DEBUG: </Text>
							<MediaQueryDebug styleText={{ fontSize: 10 }}/>
						</View>
					</MediaQuery>
					<MediaQuery minDeviceWidth={600}>
						<View style={{ marginTop: 40 }}>
							<Text> TABLET MEDIA QUERY DEBUG: </Text>
							<MediaQueryDebug styleText={{ fontSize: 10 }}/>
						</View>
					</MediaQuery>
				</DetailFragment>
			</View>
		);
	}
}

const styles = MediaQueryStylesheet.create({
	//cf. some media device width/height breakpoints to distinguish between tablet/smartphone...:
	//http://www.onlinedesignteacher.com/2015/01/css3-media-queries-for-responsive_81.html

	//Default style if medias don't match rule(s):
	container: {
		flex: 1,
		flexDirection: "column"
	},
	list: {
		flex: 3
	},
	overview: {
		flex: 1,
		padding: 10,
		backgroundColor: "lightgrey"
	},
	text: {
		fontWeight: "bold"
	},
	//Smartphone media breakpoint:
	//Attention: le css pixel spécifié correspond au dpi hardware du device - navigation bar dip 
	//Mais l'api Dimensions de react-native récupère le width et height en fonction de l'orientation du device.
	//Donc on n'aura pas le même width/height si on est en landscape ou portrait.
	//Pour avoir le width/height hardware du device, par défault, on hacke en prenant le maximum des deux valeurs pour le height
	//et le minimum pour le width. Cependant, on aura jamais la taille exacte hardware puisque suivant l'orientation le width ou height sera
	//réduit de la taille de la navigation bar (TODO: next version: faire api perso côté android et ios permettant de récupérer les infos 
	//statiques du device (device, height) + si possible orientation event callback)
	"@media (min-device-width: 320)": {
		container: {
			flex: 1,
			flexDirection: "column"
		},
		list: {
			flex: 2
		},
		overview: {
			flex: 1,
			padding: 10,
			backgroundColor: "lightgrey"
		}
	},
	//Tablet media breakpoint:
	"@media (min-device-width: 600)": {
		container: {
			flex: 1,
			flexDirection: "row"
		},
		list: {
			flex: 1
		},
		overview: {
			flex: 2,
			padding: 10,
			backgroundColor: "lightgrey"
		}
	}
});

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
