/**
 * Created by gabrielkunkel on 2/3/16 in JavaScript.
 */

/* eslint max-len: 0 */

describe("omdb service", function () {
  var movieData = { "Search": [{"Title":"Star Wars: Episode I - The Phantom Menace","Year":"1999","Rated":"PG","Released":"19 May 1999","Runtime":"136 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Liam Neeson, Ewan McGregor, Natalie Portman, Jake Lloyd","Plot":"Two Jedi Knights escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to reclaim their old glory.","Language":"English","Country":"USA","Awards":"Nominated for 3 Oscars. Another 17 wins & 60 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTQ4NjEwNDA2Nl5BMl5BanBnXkFtZTcwNDUyNDQzNw@@._V1_SX300.jpg","Metascore":"51","imdbRating":"6.5","imdbVotes":"508,509","imdbID":"tt0120915","Type":"movie","Response":"True"}]}
  var movieDataById = {"Title":"Star Wars: Episode I - The Phantom Menace","Year":"1999","Rated":"PG","Released":"19 May 1999","Runtime":"136 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Liam Neeson, Ewan McGregor, Natalie Portman, Jake Lloyd","Plot":"Two Jedi Knights escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to reclaim their old glory.","Language":"English","Country":"USA","Awards":"Nominated for 3 Oscars. Another 17 wins & 60 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTQ4NjEwNDA2Nl5BMl5BanBnXkFtZTcwNDUyNDQzNw@@._V1_SX300.jpg","Metascore":"51","imdbRating":"6.5","imdbVotes":"508,509","imdbID":"tt0120915","Type":"movie","Response":"True"}
  var moviesService = {};
  var $httpBackend;

  beforeEach(angular.mock.module("app"));

  beforeEach(inject(function (_moviesService_, _$httpBackend_) {
    moviesService = _moviesService_;
    $httpBackend = _$httpBackend_;
  }));


  it("should return movie search data from the title", function() {
    var response = [];

    $httpBackend.when('GET', 'http://www.omdbapi.com/?v=1&s=the%20phantom%20menace')
      .respond(200, movieData);

    moviesService.search('the phantom menace')
      .then(function onSuccess(data) {
        response = data;
      });

    $httpBackend.flush();

    expect(response.data).toEqual(movieData);
  }); // end it

  it("should error correctly", function() {
    var response = [];

    $httpBackend.when('GET', 'http://www.omdbapi.com/?v=1&s=the%20phantom%20menace')
      .respond(500, movieData);

    moviesService.search('the phantom menace')
      .then(function onSuccess(data) {
        response = data;
      })
      .catch(function () {
        response = "Error!";
      });

    $httpBackend.flush();

    expect(response).toEqual("Error!");
  }); // end it
  
  it("should return movie search data from the Id", function() {
    var response = [];

    $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0120915')
      .respond(200, movieDataById);

    moviesService.findById('tt0120915')
      .then(function onSuccess(data) {
        response = data;
      });

    $httpBackend.flush();

    expect(response.data).toEqual(movieDataById);
  }); // end it

}); // end describe