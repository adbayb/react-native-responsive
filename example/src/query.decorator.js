import React from "react";
import { Device } from "./query.model.js";

const Decorator = (sizeConstraints) => {
	return Target => class extends React.Component {
		static displayName = "MediaQueryDecorator";

		constructor(props) {
			super(props);
			this.device = new Device(sizeConstraints);
			this.state = {
				isVisible: this.device.isValid()
			};
		}

		render() {
			if(this.state.isVisible) {
				return (
					<Target {...this.props} />
				);
			}

			return null;
		}
	};
};

export default Decorator;
