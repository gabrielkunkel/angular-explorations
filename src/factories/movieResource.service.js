/**
 * Created by gabrielkunkel on 2/5/16 in JavaScript.
 */

(function () {

  var MovieResource = function ($resource) {
    return $resource('movies/api/:movieId');
  };

  angular
    .module("app")
    .factory("MovieResource", MovieResource);

})();