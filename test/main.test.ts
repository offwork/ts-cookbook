import { expect } from "chai";
import View = require("../source/ts/view");

describe("Base View Unit Tests:", () => {
    describe("Template", () => {
        it("should load by url", (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
        it("should not be 7", (done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });
});
