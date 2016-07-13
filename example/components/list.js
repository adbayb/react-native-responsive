import React, {
	Component,
	PropTypes
} from "react";
import {
	ListView,
	ScrollView
} from "react-native";
import Row from "./row.js";

class List extends Component {
	static propTypes = {
		...ScrollView.propTypes,
		data: PropTypes.array.isRequired,
		onClick: PropTypes.func
	};

	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: dataSource.cloneWithRows(this.props.data)
		};
	}

	render() {
		return (
			<ListView style={this.props.style} dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowID, highlightRow) =>
				<Row title={rowData.title} subtitle={rowData.subtitle} onClick={() => this.props.onClick(rowData) }/>
			} renderSeparator={this.renderSeparator}/>
		);
	}
}

export default List;