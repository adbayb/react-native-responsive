# react-native-responsive
A React Native module to manage layouts between different sizes and displays

### To not forget:

deviceWidth and deviceHeight must take in account status bar and button bar sizes


decorator requirements: .babelrc or packages.json (babel: {}):
`{
	"extends": "react-native/packager/react-packager/rn-babelrc.json",
	"plugins": ["transform-decorators-legacy"]
}`