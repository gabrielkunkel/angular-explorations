/**
 * Created by gabrielkunkel on 2/3/16 in JavaScript.
 */

/* eslint max-len: 0 */

(function () {
  "use strict";

  var MoviesService = (function () {

    function MoviesService ($q, $http) {
      this.$q = $q;
      this.$http = $http;
      this.baseUrl = 'http://www.omdbapi.com/?v=1&';
    }

    MoviesService.prototype.search = function (query) {
      var deferred = this.$q.defer();
      this.$http.get(this.baseUrl + "s=" + encodeURIComponent(query))
        .then(function onSuccess(data) {
          deferred.resolve(data);
        });
      return deferred.promise;
    }

    MoviesService.prototype.findById = function (query) {
      var deferred = this.$q.defer();
      this.$http.get(this.baseUrl + "i=" + encodeURIComponent(query))
        .then(function onSuccess(data) {
          deferred.resolve(data);
        });
      return deferred.promise;

    }

    MoviesService.$inject = ["$q", "$http"];

    return MoviesService;

  })();

  angular
    .module("app")
    .service("moviesService", MoviesService);

})();






