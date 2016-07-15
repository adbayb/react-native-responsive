import React, {
	Component,
	PropTypes
} from "react";
import {
	ListView as RNListView,
	ScrollView
} from "react-native";
import ListItem from "./list.item.js";

class ListView extends Component {
	static propTypes = {
		...ScrollView.propTypes,
		data: PropTypes.array.isRequired,
		onClick: PropTypes.func
	};

	constructor(props) {
		super(props);
		let dataSource = new RNListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: dataSource.cloneWithRows(this.props.data)
		};
	}

	render() {
		return (
			<RNListView style={this.props.style} dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowID, highlightRow) =>
				<ListItem title={rowData.title} subtitle={rowData.subtitle} onClick={() => this.props.onClick(rowData)}/>
			} renderSeparator={this.renderSeparator}/>
		);
	}
}

export default ListView;