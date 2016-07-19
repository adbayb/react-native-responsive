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

//Limitation MediaQueryDecorator HOC aux smartphones et tablettes (>= 1280 <=> desktop/ wide screen desktop)
//cf. http://www.onlinedesignteacher.com/2015/01/css3-media-queries-for-responsive_81.html
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
						<Text> TABLET MEDIA QUERY DEBUG: </Text>
						<MediaQueryDebug styleText={{ fontSize: 10 }}/>
					</View>
				</MediaQuery>
			</View>
		);
	}
};

export default Debug;