var parkingApp = angular.module('parkingApp', []);

var ParkingCtrl = function() {
  this.levels = 5;
  this.vehicles = [
    { plate: 'X-123', type: 'Car' },
    { plate: 'Y-4331', type: 'Car' },
    { plate: 'Z-654', type: 'Motorbike' }
  ];
};

ParkingCtrl.prototype.LevelLabels = function() {
  var result = [];
  for (var i = 0; i < this.levels; i++) {
    result.push("Level " + (i + 1));
  }
  return result;
};

parkingApp.controller('ParkingCtrl', ParkingCtrl);
