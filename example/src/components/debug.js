import React from "react";
import {
	View,
	Text
} from "react-native";
import { 
	MediaQuery, 
	MediaQueryDebug,
	MediaQueryDecorator
} from "react-native-responsive";

@MediaQueryDecorator({
	maxDeviceWidth: 1280
}, true)
class Debug extends React.Component {
	static propTypes = {
		consoleDebug: React.PropTypes.bool.isRequired
	};
	static defaultProps = {
		consoleDebug: false
	};

	render() {
		return (
			<View>
				<MediaQuery debug={this.props.consoleDebug} maxDeviceWidth={599}>
					<View style={{ marginTop: 10 }}>
						<Text> SMARTPHONE MEDIA QUERY DEBUG: </Text>
						<MediaQueryDebug styleText={{ fontSize: 10 }}/>
					</View>
				</MediaQuery>
				<MediaQuery minDeviceWidth={600}>
					<View style={{ marginTop: 40 }}>
						<MediaQuery minDeviceWidth={1280}>
							<Text> DESKTOP MEDIA QUERY DEBUG: </Text>
						</MediaQuery>
						<MediaQuery maxDeviceWidth={1279}>
							<Text> TABLET MEDIA QUERY DEBUG: </Text>
						</MediaQuery>
						<MediaQueryDebug styleText={{ fontSize: 10 }}/>
					</View>
				</MediaQuery>
			</View>
		);
	}
}

export default Debug;