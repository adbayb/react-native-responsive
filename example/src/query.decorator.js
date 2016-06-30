import React from "react";
import Model from "./query.model.js";

const Decorator = (sizeConstraints) => {
	return Target => class extends React.Component {
		static displayName = "MediaQueryDecorator";

		constructor(props) {
			super(props);
			this.model = new Model(sizeConstraints);
			this.state = {
				isVisible: this.model.isValidDevice()
			};
		}

		render() {
			if(this.state.isVisible) {
				return(
					<Target {...this.props} />
				);
			}

			return null;
		}
	};
};

export default Decorator;
