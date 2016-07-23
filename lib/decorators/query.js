import React from "react";
import { Device } from "../models";

const Query = (sizeConstraints, debug) => {
	return Target => class HigherOrderComponent extends React.Component {
		static displayName = "MediaQueryDecorator";

		constructor(props) {
			super(props);
			this.device = new Device(sizeConstraints);
			this.state = {
				isVisible: this.device.isValid()
			};
		}

		componentDidMount() {
			if(debug)
				this.device.debug(HigherOrderComponent.displayName);
		}

		render() {
			if(this.state.isVisible) 
				return (
					<Target {...this.props} />
				);

			return null;
		}
	};
};

export default Query;
