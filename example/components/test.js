import React from "react";
import {
	Text,
	View
} from "react-native";
import { MediaQueryDecorator } from "react-native-responsive";

@MediaQueryDecorator({
	minDeviceWidth: 0,
	maxDeviceWidth: 752,
	minPixelRatio: 2
}, true)
class Test extends React.Component {
	render() {
		return (
			<View>
				<Text>
					Test Component Enabled
				</Text>
			</View>
		);
	}
}

export default Test;
