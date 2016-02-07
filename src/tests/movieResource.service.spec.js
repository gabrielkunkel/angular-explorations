/**
 * Created by gabrielkunkel on 2/5/16 in JavaScript.
 */

describe("Movie Resource", function () {
  var $httpBackend, $resource, MovieResource;

  beforeEach(angular.mock.module("app"))

  beforeEach(inject(function (_$httpBackend_, _$resource_, _MovieResource_) {
    $httpBackend = _$httpBackend_;
    $resource = _$resource_;
    MovieResource = _MovieResource_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it("should create a movie", function() {
    $httpBackend.expectPOST('movies/api', /{"movieId":"tt0076759","description":".*"}/)
      .respond(201);

    var movie = new MovieResource({
      movieId: 'tt0076759',
      description: "Wow! What a movie!"
    });

    movie.$save();

    expect($httpBackend.flush).not.toThrow();
  }); // end it

  it("should get movie by id", function() {
    var result = {};

    $httpBackend.expectGET('movies/api/tt0076759')
      .respond(200, {
        movieId: 'tt0076759',
        description: 'boogers'
      });

    MovieResource.get({ movieId: 'tt0076759' }).$promise.then(function (_result) {
      result = _result;
    });

    expect($httpBackend.flush).not.toThrow();
    expect(result).toBeDefined();
  }); // end it

  it("should retrieve a bunch of movies but doesn't (retrieves special obj instead)", function() {
    var result = {};
    var dataToCheck = [
      { id: 1, "des": "This is one."},
      { id: 2, "des": "This is two."},
      { id: 3, "des": "This is three."}
    ];

    $httpBackend.whenGET('movies/api')
      .respond(dataToCheck);

    MovieResource.query().$promise.then(function (data) {
      result = data;
    });

    $httpBackend.flush();

    expect(result).not.toEqual(dataToCheck);
  }); // end it


  it("retrieves a bunch objects puts them in an array, but still doesn't match", function() {
    var result = {}, testArray = [];
    var dataToCheck = [
      { id: 1, "des": "This is one."},
      { id: 2, "des": "This is two."},
      { id: 3, "des": "This is three."}
    ];

    $httpBackend.whenGET('movies/api')
      .respond(dataToCheck);

    MovieResource.query().$promise.then(function (data) {
      result = data;
    });

    $httpBackend.flush();

    angular.forEach(result, function (resource) {
      testArray.push(resource);
    })

    expect(testArray).not.toEqual(dataToCheck);
  }); // end it

  it("retrieves a bunch objects puts them in an array, this time with query data, and still doesn't work", function() {
    var testArray = [];
    var dataToCheck = [
      { id: 1, "des": "This is one."},
      { id: 2, "des": "This is two."},
      { id: 3, "des": "This is three."}
    ];

    $httpBackend.whenGET('movies/api')
      .respond(dataToCheck);


    MovieResource.query(function (data) {
      testArray = data;
    });

    $httpBackend.flush();

    expect(testArray).not.toEqual(dataToCheck);
  }); // end it

  it("retrieves a bunch objects and confirms, as usual", function() {
    var dataReturned = {};
    var dataToCheck = [
      { id: 1, "des": "This is one."},
      { id: 2, "des": "This is two."},
      { id: 3, "des": "This is three."}
    ];

    $httpBackend.expect('GET', 'movies/api')
      .respond(200, dataToCheck);

    MovieResource.query().$promise.then(function (data) {
      dataReturned = data;
    });

    expect($httpBackend.flush).not.toThrow();
    expect(dataReturned).toBeDefined();
  }); // end it

  it("should update movie", function() {
    $httpBackend.expectPOST('movies/api')
      .respond(200);

    new MovieResource({
      movieId: 'tt0076759',
      description: 'An awesome movie.'
    }).$save();

    expect($httpBackend.flush).not.toThrow();
  }); // end it



}); // end describe