import React from "react";
import PropTypes from 'prop-types';
import { Device } from "../models";
import { MediaQueryPropTypes } from "../apis";

class Query extends React.Component {
	static displayName = "MediaQuery";
	static propTypes = {
		children: MediaQueryPropTypes.childrenValidator,
		debug: PropTypes.bool,
		deviceWidth: PropTypes.number,
		minDeviceWidth: PropTypes.number,
		maxDeviceWidth: PropTypes.number,
		deviceHeight: PropTypes.number,
		minDeviceHeight: PropTypes.number,
		maxDeviceHeight: PropTypes.number,
		devicePixelRatio: PropTypes.number,
		minDevicePixelRatio: PropTypes.number,
		maxDevicePixelRatio: PropTypes.number
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
