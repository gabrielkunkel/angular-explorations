module.exports = function (app) {
  angular
    .module('app')
    .factory('bandList', function () {
      return [
        { name: 'Mirella', formed: 1983 },
        { name: 'Bon Jovi', formed: 1983 }
      ]
    })
}
