describe("example component", () => {
  test("Debe ser mayor a 10", () => {
    // arreglar
    let value = 5;
    //  estimulo
    value = value + 7;
    // observar resultado
    expect(value).toBeGreaterThan(10);
  });
});
