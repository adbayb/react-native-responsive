/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import {
	AppRegistry,
	View,
	StyleSheet
} from "react-native";
//import { MediaQuery, MediaQueryStylesheet, MediaQueryDebug } from "./src";
import {
	ListFragment,
	DetailFragment
} from "./components";
import listData from "./data.js";

class ReactNativeResponsive extends Component {
	onListClick(rowData) {
		console.log("Pressed", rowData);
	}

	render() {
		return (
			<View style={styles.container}>
				<ListFragment style={styles.list} data={listData} onClick={this.onListClick}/>
				<DetailFragment style={styles.overview}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "grey"
	},
	list: {
		flex: 1,
		backgroundColor: "red"
	},
	overview: {
		flex: 1,
		backgroundColor: "yellow"
	}
});

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
