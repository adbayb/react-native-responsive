import React, {
	Component
} from "react";
import {
	AppRegistry,
	View,
	Text
} from "react-native";
import {
	MediaQueryStyleSheet
} from "react-native-responsive";
import {
	ListFragment,
	DetailFragment
} from "./components";
import Debug from "./components/debug.js";
import listData from "./data";

class ReactNativeResponsive extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowData: {}
		};
	}

	onListClick(rowData) {
		this.setState({
			rowData: rowData
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListFragment style={styles.list} data={listData} onClick={this.onListClick.bind(this) }/>
				<DetailFragment style={styles.overview} empty={Object.keys(this.state.rowData).length <= 0}>
					<Text style={styles.text}> {this.state.rowData.subtitle} </Text>
					<Text style={styles.text}> {this.state.rowData.title} </Text>
					<Text style={styles.text}> {this.state.rowData.description} </Text>

					<Debug consoleDebug={true}/>
				</DetailFragment>
			</View>
		);
	}
}

const styles = MediaQueryStyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
	},
	list: {
		flex: 3
	},
	overview: {
		flex: 1,
		padding: 10,
		backgroundColor: "lightgrey"
	},
	text: {
		fontWeight: "bold"
	},
	"@media (min-device-width: 320)": {
		container: {
			flex: 1,
			flexDirection: "column"
		},
		list: {
			flex: 2
		},
		overview: {
			flex: 1,
			padding: 10,
			backgroundColor: "lightgrey"
		}
	},
	"@media (min-device-width: 600)": {
		container: {
			flex: 1,
			flexDirection: "row"
		},
		list: {
			flex: 1
		},
		overview: {
			flex: 2,
			padding: 10,
			backgroundColor: "lightgrey"
		}
	}
});

AppRegistry.registerComponent("ReactNativeResponsive", () => ReactNativeResponsive);
