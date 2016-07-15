import React, {
	Component,
	PropTypes
} from "react";
import {
	View,
	Text
} from "react-native";
import { Device } from "./query.model.js";

class DebugComponent extends Component {
	static displayName = "MediaQueryDebug";

	static propTypes = {
		...View.propTypes,
		...Text.propTypes
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

export default DebugComponent;