describe('MainCtrl', function () {
  var mainCtrl, $scope;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should assign the correct rapper to scope', function () {
    expect($scope.emcee).toEqual(', my friend, Kool G Rap!');
  });


});
