import React from "react";
import MediaQueryBase from "./query.base.js";

const MediaQueryDecorator = (sizeConstraints) => {
	return Target => class extends React.Component {
		static displayName = "MediaQueryDecorator";

		constructor(props) {
			super(props);
			this.media = new MediaQueryBase(sizeConstraints);
			this.state = {
				isVisible: this.media.isValidDevice()
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

export default MediaQueryDecorator;
