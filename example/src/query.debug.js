import React, {
	Component,
	PropTypes
} from "react";
import {
	View,
	Text
} from "react-native";

class Debug extends Component {
	static displayName = "MediaQueryDebug";

	static propTypes = {
		children: PropTypes.node
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text> TOTO </Text>
				{this.props.children}
			</View>
		);
	}
}

export default Debug;