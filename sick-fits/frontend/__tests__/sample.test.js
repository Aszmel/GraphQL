describe("sample test", () => {
  it("works as expected", () => {
    expect(1).toEqual(1);
  });

  it("handles ranges well", () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  //here u can make:
  //xit or it.skip
  //fit or it.only
  it("check the list of array", () => {
    const names = ["arek", "kasia", "lena", "pola"];
    expect(names).toContain("lena", "pola");
  });
});
