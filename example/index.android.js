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

import ResponsiveLayout from "./src/responsive.js";//ResponsiveStore?
import MediaQuery from "./src/mediaquery.js";

class ReactNativeResponsive extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<MediaQuery style={styles.mediaquery} minDeviceWidth={200} maxDeviceWidth={1080}>
					<View style={[styles.container, {backgroundColor: "blue"}]}>
						<Text> Container 1 </Text>
					</View>
				</MediaQuery>
				<MediaQuery style={styles.mediaquery} minDeviceWidth={200} maxDeviceWidth={1080} maxPixelRatio={3}>
					<View style={[styles.container, {backgroundColor: "white"}]}>
						<Text> Container 2 </Text>
					</View>
				</MediaQuery>
				<MediaQuery style={styles.mediaquery} minDeviceWidth={200} maxDeviceWidth={1080}>
					<View style={[styles.container, {backgroundColor: "red"}]}>
						<Text> Container 3 </Text>
					</View>
				</MediaQuery>
			</View>
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
	"container": {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
