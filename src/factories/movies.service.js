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

      /**
       * @param {String} setting
       * @param {String} query
       * @returns {Function}
       */
      this.httpPromise = function (setting, query) {
        var deferred = this.$q.defer();
        this.$http.get(this.baseUrl + setting + encodeURIComponent(query))
          .then(function (data) {
            deferred.resolve(data);
          }, function onReject() {
            deferred.reject();
          });

        return deferred.promise;
      }

    }

    /**
     *
     * @param {String} query
     * @returns {Function}
     */
    MoviesService.prototype.search = function (query) {
      return this.httpPromise("s=", query);
    }

    /**
     *
     * @param {String} query
     * @returns {Function}
     */
    MoviesService.prototype.findById = function (query) {
      return this.httpPromise("i=", query);

    }

    MoviesService.$inject = ["$q", "$http"];

    return MoviesService;

  })();

  angular
    .module("app")
    .service("moviesService", MoviesService);

})();






