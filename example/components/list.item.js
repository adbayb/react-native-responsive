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
		//Props spécifiques à l'api ListView: cf. https://facebook.github.io/react-native/docs/listview.html#renderrow
		//Utile pour utiliser renderSeparator et manager le design du séparateur de la row sélectionnée via adjacentRowHighlighted:
		//sectionID: PropTypes.string,
		//rowID: PropTypes.string,
		//highlightRow: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	onClick() {
		//this.props.highlightRow(this.props.sectionID, this.props.rowID);
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
		//TouchableNativeFeedback seulement supporté par Android !
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