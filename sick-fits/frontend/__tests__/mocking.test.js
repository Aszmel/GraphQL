function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    //simulate an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe("mocking testing", () => {
  it("mock a reg function", () => {
    const fetch = jest.fn();
    fetch();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("can create a Person", () => {
    const me = new Person("Arek", ["pizza", "burgs"]);
    expect(me.name).toBe("Arek");
  });

  it("can fetch foods", async () => {
    const me = new Person("Arek", ["pizza", "burgs"]);
    //due to time taking of fetching or server down or something...
    //we mocking our fetching function
    me.fetchFavFoods = jest.fn().mockResolvedValue(["sushi", "pasta"]);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain("sushi");
  });
});
