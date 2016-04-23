/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, {Component} from "react";
import {
	AppRegistry,
	StyleSheet,
	Text
} from "react-native";

import ResponsiveLayout from "./src/responsive.js";

class ReactNativeResponsive extends Component {
	render() {
		return (
			<ResponsiveLayout style={styles.container}>
				<Text> Test Responsive </Text>
			</ResponsiveLayout>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	}
});

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
