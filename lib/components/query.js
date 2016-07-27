import React from "react";
import { Device } from "../models";
import { MediaQueryPropTypes } from "../apis";

class Query extends React.Component {
	static displayName = "MediaQuery";
	static propTypes = {
		children: MediaQueryPropTypes.childrenValidator,
		debug: React.PropTypes.bool,
		deviceWidth: React.PropTypes.number,
		minDeviceWidth: React.PropTypes.number,
		maxDeviceWidth: React.PropTypes.number,
		deviceHeight: React.PropTypes.number,
		minDeviceHeight: React.PropTypes.number,
		maxDeviceHeight: React.PropTypes.number,
		devicePixelRatio: React.PropTypes.number,
		minDevicePixelRatio: React.PropTypes.number,
		maxDevicePixelRatio: React.PropTypes.number
	};
	static defaultProps = {
		debug: false
	};

	constructor(props) {
		super(props);
		this.device = new Device(this.props);
		this.state = {
			isVisible: this.device.isValid()
		};
	}

	componentDidMount() {
		if(this.props.debug)
			this.device.debug(Query.displayName);
	}

	render() {
		if(this.state.isVisible)
			return this.props.children;
			
		return null;
	}
}

export default Query;
