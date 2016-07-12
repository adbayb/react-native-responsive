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
		...View.propTypes
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View {...this.props}>
				{ Device.information.map((data, key) => <Text key={key}> {data} </Text>) }
			</View>
		);
	}
}

export default DebugComponent;