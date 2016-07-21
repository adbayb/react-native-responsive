import React from "react";
import { Device } from "../models";

const Decorator = (sizeConstraints, debug) => {
	return Target => class DecoratorComponent extends React.Component {
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
				this.device.debug(DecoratorComponent.displayName);
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

export default Decorator;
