var _ = require('lodash')

describe("List", function() {

  describe("listCtrl", function() {
    var ctrl;

    beforeEach(function () {
      angular.mock.module('app');
    })

    beforeEach(inject(function ($controller) {
      ctrl = $controller('listCtrl')
    }))

    it("should define a list object", function() {
      expect(ctrl.list).toBeDefined();
    }); // end it

    it("should define first list object", function() {
      expect(ctrl.list[0]).toEqual('test');
    }); // end it

    describe("when using a to-do list", function() {

      beforeEach(function () {
        ctrl.add('repeat');
      })

      it("should add item to last item in list", function() {
        var lastIndexOfList = ctrl.list.length - 1
        expect(ctrl.list[lastIndexOfList]).toEqual('repeat');
      }); // end it



    }); // end describe



  }); // end describe


}); // end describe
