assert = require("assert");
const ShoeServiceTesting = require("../services/shoes-service");



describe("Greeting function", function () {
    it("should perform a greeting", function () {
        const shoeServiceTesting = ShoeServiceTesting();

        let result = shoeServiceTesting.helloWorld()
        assert.equal("Hello World!", result)
    });
});