import React, {
	Component,
	PropTypes
} from "react";
import {
	Platform,
	View,
	Text,
	TouchableNativeFeedback,
	TouchableHighlight,
	StyleSheet
} from "react-native";

class ListItem extends Component {
	static propTypes = {
		children: PropTypes.node,
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string,
		onClick: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	onClick() {
		this.props.onClick();
	}

	renderItem() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
				</View>

				<View style={styles.textContainer}>
					<Text> {this.props.title} </Text>
					<Text> {this.props.subtitle} </Text>
				</View>
			</View>
		);
	}

	render() {
		if(Platform.OS === "android")
			return (
				<TouchableNativeFeedback onPress={() => this.onClick() }>
					{this.renderItem() }
				</TouchableNativeFeedback>
			);

		return (
			<TouchableHighlight onPress={() => this.onClick() }>
				{this.renderItem() }
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 90,
		padding: 10,
		flexDirection: "row",
		backgroundColor: "white",
		borderBottomColor: "lightgrey",
		borderBottomWidth: 0.75
	},
	imageContainer: {
		height: 70,
		width: 70,
		backgroundColor: "darkgrey"
	},
	textContainer: {
		flex: 3
	}
});

export default ListItem;