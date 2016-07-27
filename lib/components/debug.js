import React, {
	Component
} from "react";
import {
	View,
	Text
} from "react-native";
import { Device } from "../models";

class Debug extends Component {
	static displayName = "MediaQueryDebug";
	static propTypes = {
		...View.propTypes
	};

	constructor(props) {
		super(props);
	}

	render() {
		let {
			styleText,
			...others
		} = this.props;

		return (
			<View {...others}>
				{ Device.information.map((data, key) => <Text key={key} style={styleText}> {data} </Text>) }
			</View>
		);
	}
}

export default Debug;