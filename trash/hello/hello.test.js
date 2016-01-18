import exportme from './hello';


describe("a test test", function() {

  it("the test", function() {
    expect(1).toBe(1);
  }); // end it

  it("humperdink test", function() {
    expect(exportme[0]).toBe('humperdink');
  }); // end it

  it("another test", function() {
    expect(exportme).toEqual(['humperdink', 'johnny']);
  }); // end it

}); // end describe
