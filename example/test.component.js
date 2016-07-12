import React from "react";
import {
	Text,
	View
} from "react-native";
import { MediaQueryDecorator } from "./src/index.js";

@MediaQueryDecorator({
	minDeviceWidth: 0,
	maxDeviceWidth: 1080,
	minPixelRatio: 2
}, true)
class Test extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text>
					Test Component Enabled
				</Text>
			</View>
		);
	}
}

export default Test;
