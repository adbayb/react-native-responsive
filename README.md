# React Native Responsive <br/> [![npm version](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/react-native-responsive)	[![react-native version](https://img.shields.io/badge/react--native-min%20v0.25.0-blue.svg)](https://github.com/facebook/react-native) 

<br/>

The power of Media Queries now in your React Native project !<br/>
This library allows you to manage layouts between different sizes and displays: responsive design .<br/>
A set of apis, components and decorators helps you to implement and build responsive applications easily and as fast as possible. 


**TODO: Screenshot gif**

<br/>

## Table of Contents

- [Installation](#installation)
- [General Usage](#general-usage)
	* [Introduction](#introduction)
	* [MediaQuery](#mediaquery-component-approach)
		* [Props](#props)
	* [MediaQueryDecorator](#mediaquerydecorator-decorator-approach)
		* [Prerequisites](#prerequisites)
		* [Valid Object Keys](#valid-object-keys)
	* [MediaQueryStyleSheet](#mediaquerystylesheet-functional-api-approach)
		* [Apis](#apis)
- [Examples](#examples)
	* [Practical Use Case](#practical-use-case)
	* [Demonstration Application](#demonstration-application)
- [Misc](#misc)
	* [Unit Of Measurement](#unit-of-measurement)
	* [Debug Component](#debug-component)
	* [TODOs](#todos)
- [License](#license)

<br/><br/><br/>

## Installation

<br/>

- [x] Go to your root project folder
- [x] Install react-native-responsive from npm repository: 

	```
	npm install react-native-responsive --save
	```

- [x] You are now good to go !

<br/><br/><br/><br/>

## General Usage

<br/>

### Introduction

Before anything else, some definitions:
- [x] Responsive Design is the practice of using tools to progressively enhance a content for different viewing contexts
- [x] Media Query is a CSS tool to help adapting content rendering following conditions

For this, react-native-responsive library introduces 3 ways to implement media queries:
- [x] A component based way: [MediaQuery](#mediaquery-component-approach)
- [x] A decorator based way: [MediaQueryDecorator](#mediaquerydecorator-decorator-approach)
- [x] A functional api based way: [MediaQueryStyleSheet](#mediaquerystylesheet-functional-api-approach)

<br/>

### MediaQuery (Component approach)

A MediaQuery component like any other React component with props describing common media query device rules.
If a rule is valid, all views stored inside corresponding MediaQuery are displayed. Else, they will be hidden.
Given it component nature, you can nest it and do all the normal things that you can do with regular React components.

#### Props:

> **deviceWidth** number *optional* <br/>Describes the width of the rendering surface of the output device.<br/><br/>
> **minDeviceWidth** number *optional* <br/>Describes the minimum width of the rendering surface of the output device.<br/><br/>
> **maxDeviceWidth** number *optional* <br/>Describes the maximum width of the rendering surface of the output device.<br/><br/>
> **deviceHeight** number *optional* <br/>Describes the height of the rendering surface of the output device.<br/><br/>
> **minDeviceHeight** number *optional* <br/>Describes the minimum height of the rendering surface of the output device.<br/><br/>
> **maxDeviceHeight** number *optional* <br/>Describes the maximum height of the rendering surface of the output device.<br/><br/>
> **pixelRatio** number *optional* <br/>Describes the resolution in physical pixels per CSS pixel.<br/><br/>
> **minPixelRatio** number *optional* <br/>Describes the minimum resolution in physical pixels per CSS pixel.<br/><br/>
> **maxPixelRatio** number *optional* <br/>Describes the maximum resolution in physical pixels per CSS pixel.<br/><br/>
> **debug** boolean *optional, default = false* <br/>Enables console debugging.<br/><br/>

<br/>

### MediaQueryDecorator (Decorator approach)

An ES2016 syntactic sugar to describe and build media queries (a higher order component is created and responsible for that task):
```jsx
@MediaQueryDecorator(MediaFeaturesObject, debug) //debug is optional and allows console debugging
class Example extends React.Component {
	...
}
```

#### Prerequisites

In order to allow Babel transpiler to parse decorator syntax, you need to enable `transform-decorators` plugin.

For this:
- [x] Go to your root project folder
- [x] If not, create `.babelrc` file
- [x] Add the following lines to your `.babelrc` file:
```
{
	"extends": "react-native/packager/react-packager/rn-babelrc.json",
	"plugins": ["transform-decorators-legacy"]
}
``` 

#### Valid Object Keys

> **deviceWidth** number *optional* <br/>Describes the width of the rendering surface of the output device.<br/><br/>
> **minDeviceWidth** number *optional* <br/>Describes the minimum width of the rendering surface of the output device.<br/><br/>
> **maxDeviceWidth** number *optional* <br/>Describes the maximum width of the rendering surface of the output device.<br/><br/>
> **deviceHeight** number *optional* <br/>Describes the height of the rendering surface of the output device.<br/><br/>
> **minDeviceHeight** number *optional* <br/>Describes the minimum height of the rendering surface of the output device.<br/><br/>
> **maxDeviceHeight** number *optional* <br/>Describes the maximum height of the rendering surface of the output device.<br/><br/>
> **pixelRatio** number *optional* <br/>Describes the resolution in physical pixels per CSS pixel.<br/><br/>
> **minPixelRatio** number *optional* <br/>Describes the minimum resolution in physical pixels per CSS pixel.<br/><br/>
> **maxPixelRatio** number *optional* <br/>Describes the maximum resolution in physical pixels per CSS pixel.<br/><br/>

<br/>

### MediaQueryStyleSheet (Functional Api approach)

#### Apis

- [x] `MediaQueryStyleSheet.create(baseStylesObject, mediaRulesObject);`

> It's similar to React Native StyleSheet.create(obj) api except that it takes one more argument: <br/>
> mediaRulesObject (*optional*) stores media query rules as keys (corresponding styles are affected as values). <br/>
> Rules are written like regular css media query rules.
- [x] `MediaQueryStyleSheet.debug();`

> Enables console debugging.

<br/><br/><br/><br/>

## Examples

<br/>

### Practical Use Case

If you want to apply to your application a common CSS media query like this:
```css
.container {
	display: flex;
	flex-direction: row;
	background-color: red;
}
@media (min-device-width: 320) and (max-device-height: 720) {
	.container {
		flex-direction: column;
	}
}
```

With React Native Responsive, you would write:
- [x] Through the component MediaQuery:
	```jsx
	...
	import { MediaQuery } from "react-native-responsive";

	const Example = (props) => {
		return (
			<MediaQuery minDeviceWidth={320} maxDeviceHeight={720}>
				<View style={{ flex: 1, flexDirection: "column", backgroundColor: "red" }}>
					<Text> Test </Text>
				</View>
			</MediaQuery>
			<MediaQuery maxDeviceWidth={319} minDeviceHeight={721}>
				<View style={{ flex: 1, flexDirection: "row", backgroundColor: "red" }}>
					<Text> Test </Text>
				</View>
			</MediaQuery>
		);
	};
	```
- [x] Through the class decorator MediaQueryDecorator:
	```jsx
	...
	import { MediaQueryDecorator } from "react-native-responsive";

	@MediaQueryDecorator({
		minDeviceWidth: 320,
		maxDeviceHeight: 720
	});
	class Example1 extends React.Component {
		...
	}

	@MediaQueryDecorator({
		maxDeviceWidth: 319,
		minDeviceHeight: 721
	});
	class Example2 extends React.Component {
		...
	}
	```
- [x] Through the functional api MediaQueryStyleSheet (more concise since css properties are automatically merged):
	```jsx
	...
	import { MediaQueryStyleSheet } from "react-native-responsive";

	const styles = MediaQueryStyleSheet.create(
		//Base styles:
		{
			container: {
				flex: 1,
				flexDirection: "row",
				backgroundColor: "red"
			}
		},
		//Media Queries styles:
		{
			"@media (min-device-width: 320) and (max-device-height: 720)": {
				container: {
					flexDirection: "column"
				}
			}
		}
	);
	```

<br/>

### Demonstration Application

If you want an overview of this library, it's interesting to try the demonstration code located inside `./example` folder.

#### Prerequisites

To build and test this demo, just follow these steps:

- [x] Connect your device or launch your Android emulator
- [x] Clone this repository
- [x] Go to the example folder: `cd ./example`
- [x] Install npm dependencies: `npm install`
- [x] Build and deploy the demonstration application by running: 
	- If you develop on an ios device: `npm run cli run-ios`
	- If you develop on an android device: `npm run cli run-android`
- [x] Enjoy the demonstration !

#### Screenshot output

TODO Screenshot.

<br/><br/><br/><br/>

## Misc

<br/>

### Unit Of Measurement

All Media Queries (like all React Native Css properties) are expressed in CSS pixels (<=> dip/dp: density independant pixel) (a CSS pixel may not be the same as a hardware pixel especially on high-density displays).

Typically:
```
cssPixel (in dip/dp) = hardwarePixel (in px) / pixelRatio
```
You must take in account this while writing your media rules. For example, for a device with a width of 1920 pixels, a height of 1080 pixels and a pixel ratio of 3, you would write instead 640 dp (=1920/3) for width and 360 dp (=1080/3) for height.

*See [mydevice.io](http://mydevice.io/devices/) for some units mapping according to devices* 

<br/>

### Debug Component

TODO: deviceWidth and deviceHeight must take in account status bar and button bar sizes + screenshot debug

<br/>

### TODOs

- [x] Add more features:
	- Orientation (needs to create android and ios orientation event handler native dependencies)
	- Platform ios/android (checks from React Native Platform api)
- [x] Allow nested media rules through MediaQueryStyleSheet.create() api

<br/><br/><br/><br/>

## License

[MIT](./LICENSE "License MIT")
