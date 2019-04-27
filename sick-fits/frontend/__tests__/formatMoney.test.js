import formatMoney from "../lib/formatMoney";

//unit testing

describe("formatMoney function", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("$0.01");
    expect(formatMoney(10)).toEqual("$0.10");
  });

  it("leave cents off for whole dollars", () => {
    expect(formatMoney(1000)).toEqual("$10");
    expect(formatMoney(50000000)).toEqual("$500,000");
  });

  it("works with whole dollars and cents", () => {
    expect(formatMoney(1750)).toEqual("$17.50");
  });
});
