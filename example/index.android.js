/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, {Component} from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from "react-native";

import ResponsiveLayout from "./src/responsive.js";
import MediaQuery from "./src/mediaquery.js";

class ReactNativeResponsive extends Component {
	render() {
		return (
			<ResponsiveLayout style={styles.responsivelayout}>
				<MediaQuery style={styles.mediaquery} minWidth={200} maxWidth={1080}>
					<View style={styles.container2}>
						<Text> Test Responsive </Text>
					</View>
				</MediaQuery>
				<MediaQuery style={styles.mediaquery} minWidth={200} maxWidth={4000}>
					<View style={styles.container1}>
						<Text> Test Responsive </Text>
					</View>
				</MediaQuery>
			</ResponsiveLayout>
		);
	}
}

const styles = StyleSheet.create({
	responsivelayout: {
		flex: 1,
		backgroundColor: "yellow"
	},
	mediaquery: {
		flex: 1,
		backgroundColor: "#000000"
	},
	container1: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FF0000"
	},
	container2: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0000FF"
	}
});

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
