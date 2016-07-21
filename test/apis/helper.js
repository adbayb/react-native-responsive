import {
	expect
} from "chai";
import Helper from "../../lib/apis/helper.js";

console.log(Helper);

describe('Helper', function() {
	describe('#isInInterval(x, min, max)', () => {
		it('should return true when x <= min and max not specified', () => {
			//let actual = Helper.isInInterval(1, 2);
			expect(Helper.isInInterval(1, 2)).to.be.true;
			expect(Helper.isInInterval(10, 10)).to.be.true;
		});
	});

	describe('#isInInterval(x, min, max)', () => {
		it('should return true when x >= max and min not specified', () => {
			//let actual = Helper.isInInterval(1, 2);
			expect(Helper.isInInterval(3, null, 2)).to.be.true;
			expect(Helper.isInInterval(1, null, 1)).to.be.true;
		});
	});
});
