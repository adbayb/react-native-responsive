# React Native Responsive <br/> [![npm version](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/react-native-responsive)	[![react-native version](https://img.shields.io/badge/react--native-min%20v0.25.0-blue.svg)](https://github.com/facebook/react-native) 

<br/>

The power of Media Queries now in your React Native project (ios and android) !<br/>
This library allows you to manage layouts between different sizes and displays: Responsive Design can now be easily managed.<br/>
A set of apis, components and decorators helps you to implement and build responsive applications easily and as fast as possible. 

<br/>

![Demonstration Application](https://cloud.githubusercontent.com/assets/10498826/17181797/9f0b9404-5421-11e6-80d3-3b1cbdcf5c6b.gif)

*For more details, see [Demonstration Application Documentation](#demonstration-application) || For corresponding code, see [Demonstration Application Source Code](example)*

<br/><br/>

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
		* [Valid Media Features Keys](#valid-media-features-keys)
- [Examples](#examples)
	* [Practical Use Case](#practical-use-case)
	* [Demonstration Application](#demonstration-application)
- [Misc](#misc)
	* [Unit Of Measurement](#unit-of-measurement)
	* [Debug Component](#mediaquerydebug-debug-component)
		* [Props](#props)
		* [Output Example](#output-example)
		* [Important Note](#important-note-concerning-size-debugging-outputs)
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
> **devicePixelRatio** number *optional* <br/>Describes the resolution in physical pixels per CSS pixel.<br/><br/>
> **minDevicePixelRatio** number *optional* <br/>Describes the minimum resolution in physical pixels per CSS pixel.<br/><br/>
> **maxDevicePixelRatio** number *optional* <br/>Describes the maximum resolution in physical pixels per CSS pixel.<br/><br/>
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
> **devicePixelRatio** number *optional* <br/>Describes the resolution in physical pixels per CSS pixel.<br/><br/>
> **minDevicePixelRatio** number *optional* <br/>Describes the minimum resolution in physical pixels per CSS pixel.<br/><br/>
> **maxDevicePixelRatio** number *optional* <br/>Describes the maximum resolution in physical pixels per CSS pixel.<br/><br/>

<br/>

### MediaQueryStyleSheet (Functional Api approach)

#### Apis

**`MediaQueryStyleSheet.create(baseStylesObject, mediaRulesObject);`** <br/>
> It's similar to React Native StyleSheet.create(obj) api except that it takes one more argument: <br/>
> mediaRulesObject (*optional*) stores media query rules as keys (corresponding styles are affected as values). <br/>
> Rules are written like regular css media query rules.<br/><br/>

**`MediaQueryStyleSheet.debug();`** <br/>
> Enables console debugging.<br/><br/>

#### Valid Media Features Keys

> **device-width** number *optional* <br/>Describes the width of the rendering surface of the output device.<br/><br/>
> **min-device-width** number *optional* <br/>Describes the minimum width of the rendering surface of the output device.<br/><br/>
> **max-device-width** number *optional* <br/>Describes the maximum width of the rendering surface of the output device.<br/><br/>
> **device-height** number *optional* <br/>Describes the height of the rendering surface of the output device.<br/><br/>
> **min-device-height** number *optional* <br/>Describes the minimum height of the rendering surface of the output device.<br/><br/>
> **max-device-height** number *optional* <br/>Describes the maximum height of the rendering surface of the output device.<br/><br/>
> **device-pixel-ratio** number *optional* <br/>Describes the resolution in physical pixels per CSS pixel.<br/><br/>
> **min-device-pixel-ratio** number *optional* <br/>Describes the minimum resolution in physical pixels per CSS pixel.<br/><br/>
> **max-device-pixel-ratio** number *optional* <br/>Describes the maximum resolution in physical pixels per CSS pixel.<br/><br/>

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

#### Tips for DRY Media Queries
Much like SCSS and other preprocessed libraries, you can create a variable to reuse common queries. 

In scss you might do:
```scss
$xsUp: "@media all and (min-width: 320px)";
```

With ES6 you might do:
```js
const IPHONE_7_AND_UP = `@media (min-device-width: 320) and (min-device-height: 720)`;
```

<br />

For further `DRY`-ness, create a seperate file with all of your media query breakpoints and export for use throughout your application.

```js
const IPHONE_WIDTH = 320;
const IPHONE_7_HEIGHT = 720;
export const IPHONE_7_AND_UP = `@media (min-device-width: ${IPHONE_WIDTH) and (min-device-height: ${IPHONE_7_HEIGHT)`;
```

Altogether that would look like:

```js
import {IPHONE_7_AND_UP} from '../styles/breakpoints';

...

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
		[IPHONE_7_AND_UP]: {
			container: {
				flexDirection: "column"
			}
		}
	}
);
```
<br />

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

Here's different layouts managed by React Native Responsive module (Nexus 5 smartphone vs Nexus 10 tablet):

*For corresponding code, see [Source Code](example)*

![Demonstration Application](https://cloud.githubusercontent.com/assets/10498826/17181797/9f0b9404-5421-11e6-80d3-3b1cbdcf5c6b.gif)

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

### MediaQueryDebug (Debug Component)

If you want some information regarding to hardware specifications of your device, there is a component dedicated to this: **MediaQueryDebug**:
```jsx
import { MediaQueryDebug } from "react-native-responsive";

const Example = (props) => {
	return (
		<MediaQueryDebug style={{ flex: 1 }} styleText={{ fontSize: 10 }}/>
	);
};
```

#### Props

> [View props...](https://facebook.github.io/react-native/docs/view.html#props)<br/><br/>
> **styleText** object *optional* <br/>Customizes text debugging styles.<br/><br/>

#### Output Example

<p align="center">
	<img src="https://cloud.githubusercontent.com/assets/10498826/17178139/868a846a-5414-11e6-910b-53ff70a2726c.png" title="MediaQueryDebug Output" alt="MediaQueryDebug Output"/>
</p>

#### Important note concerning size debugging outputs

On Android, a device can have screen decoration (such as a navigation bar) along the edges of the display that reduce the amount of application space available from the size returned here.
React Native Responsive computes device constraints accordingly to window available space and not to hardware screen size (due to React Native Dimensions api).

For example, a LG Nexus 5 has:
```
Hardware view = 640 x 360 dp
Content view = 592 x 360 dp (due to 48 dp of navigation bar)
```

<br/>

### TODOs

- [x] Replace React Native Dimensions.get("window") api (dependent from initial orientation screen) by a custom ios/android native module independent from initial device orientation 
- [x] Add more features:
	- Orientation (needs to create android and ios orientation event handler native dependencies)
	- Platform ios/android (checks from React Native Platform api)
- [x] Allow nested media rules through MediaQueryStyleSheet.create() api

<br/><br/><br/><br/>

## License

[MIT](./LICENSE "License MIT")
