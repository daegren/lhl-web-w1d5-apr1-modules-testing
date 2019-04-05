var expect = require("chai").expect;
var add = require("../add");

describe("add", function() {
  it("should return 4 if we add 2 and 2 together", function() {
    var expected = 4;
    var result = add(2, 2);

    expect(result).to.equal(expected);
  });

  it("should return a number", function() {
    expect(add(2, 2)).to.be.a("number");
  });

  it("returns null if any paramter is a string", function() {
    expect(add("2", "2")).to.equal(null);
    expect(add(2, "5")).to.equal(null);
    expect(add("7", 2)).to.equal(null);
  });
});
