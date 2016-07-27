import {
	expect
} from "chai";
import StyleSheetUtil from "../../../lib/apis/utils/stylesheet.js";

describe("StyleSheetUtil", function() {
	let target = {
		container: {
			flex: 1
		},
		backgroundColor: "red",
		margin: 0
	};
	let source = {
		container: {
			flexDirection: "row"
		},
		item: {
			flex: 5
		},
		backgroundColor: "black",
		padding: 0
	};

	describe("#merge(target, source)", () => {
		it("should return an object with properties correctly merged (merge only on first properties/properties of first objects level)", () => {
			let expected = {
				container: {
					flex: 1,
					flexDirection: "row"
				},
				item: {
					flex: 5
				},
				backgroundColor: "black",
				padding: 0,
				margin: 0
			};
			
			expect(StyleSheetUtil.merge(target, source)).to.be.eql(expected);
		});
	});

	describe("#parseSizeFeature(feature)", () => {
		it("should return an object with correct parsed size key/value feature", () => {
			let actual = "min-device-width: 540px";
			let expected = {
				key: "min-device-width",
				value: 540
			};
			
			expect(StyleSheetUtil.parseSizeFeature(actual)).to.be.eql(expected);
		});
	});

	describe("#parseSizeFeature(feature)", () => {
		it("should return null when size feature doesn't match requirements", () => {
			let actual = "min-device-width: test";
			
			expect(StyleSheetUtil.parseSizeFeature(actual)).to.be.null;
		});
	});
});