/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View
} from "react-native";
import Test from "./test.component";
import { MediaQuery, MediaQueryStylesheet, MediaQueryDebug } from "./src/index.js";

class ReactNativeResponsive extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<MediaQueryDebug style={{backgroundColor: "white"}} />
				<MediaQuery debug={true} minDeviceWidth={200} maxDeviceWidth={1080}>
					<View style={[styles.container, { backgroundColor: "blue" }]}>
						<Text> Container 1 </Text>
					</View>
				</MediaQuery>
				<MediaQuery minDeviceWidth={200} maxDeviceWidth={1080} maxPixelRatio={3}>
					<View style={[styles.container, { backgroundColor: "white" }]}>
						<Text> Container 2 </Text>
					</View>
				</MediaQuery>
				<MediaQuery minDeviceWidth={200} maxDeviceWidth={1080}>
					<View style={[styles.container, { backgroundColor: "red" }]}>
						<Text> Container 3 </Text>
					</View>
				</MediaQuery>

				<View style={styles.mediaQuery}>
					<Text> Container 4 </Text>
				</View>

				<Test />
			</View>
		);
	}
}

const styles = MediaQueryStylesheet.create({
	container: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},

	mediaQuery: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "green"
	},
	"@media (device-width: 1080) and (device-height: 1794) and (device-pixel-ratio: 2.625)": {
		mediaQuery: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "purple"
		}
	},
	"@media (min-device-width: 200px) and (max-device-height: 1794px)": {
		mediaQuery: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "yellow"
		}
	}
}, true);

MediaQueryStylesheet.debug();

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
