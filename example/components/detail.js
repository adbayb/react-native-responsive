import React, {
	Component
} from "react";
import {
	View,
	Text
} from "react-native";

class Detail extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		...View.propTypes
	};

	render() {
		return(
			<View style={this.props.style}>
				<Text> TOTO </Text>
			</View>
		);
	}
}

export default Detail;