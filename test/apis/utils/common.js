import {
	expect
} from "chai";
import CommonUtil from "../../../lib/apis/utils/common.js";

describe("CommonUtil", function() {
	describe("#isInInterval(x, min, max)", () => {
		it("should return true when min <= x <= max", () => {
			expect(CommonUtil.isInInterval(1, 0, 2)).to.be.true;
			expect(CommonUtil.isInInterval(1, 1, 1)).to.be.true;
			expect(CommonUtil.isInInterval(0, 0, 0)).to.be.true;
		});
	});
	
	describe("#isInInterval(x, min, max)", () => {
		it("should return false when !(min <= x <= max)", () => {
			expect(CommonUtil.isInInterval(1, 3, 5)).to.be.false;
		});
	});

	describe("#isInInterval(x, min, max)", () => {
		it("should return true when x >= min and max not specified", () => {
			expect(CommonUtil.isInInterval(1, 0)).to.be.true;
		});
	});

	describe("#isInInterval(x, min, max)", () => {
		it("should return false when x < min and max not specified", () => {
			expect(CommonUtil.isInInterval(1, 2)).to.be.false;
		});
	});

	describe("#isInInterval(x, min, max)", () => {
		it("should return true when x <= max and min not specified", () => {
			expect(CommonUtil.isInInterval(1, null, 2)).to.be.true;
		});
	});

	describe("#isInInterval(x, min, max)", () => {
		it("should return false when x > max and min not specified", () => {
			expect(CommonUtil.isInInterval(1, null, 0)).to.be.false;
		});
	});

	describe("#isInIntervalOrEqual(x, y, min, max)", () => {
		it("should return true when x === y", () => {
			expect(CommonUtil.isInIntervalOrEqual(1, 1)).to.be.true;
		});
	});

	describe("#isInIntervalOrEqual(x, y, min, max)", () => {
		it("should return false when x !== y", () => {
			expect(CommonUtil.isInIntervalOrEqual(1, 2)).to.be.false;
		});
	});
});
