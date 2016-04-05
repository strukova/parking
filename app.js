var parkingApp = angular.module('parkingApp', []);

var ParkingCtrl = function() {
  this.levels = 5;
  this.slotsPerLevel = 10;
  this.slots = new Array(this.levels);
  for (var i = 0; i < this.levels; i++) {
    this.slots[i] = new Array(this.slotsPerLevel);
  }
  for (var i = 0; i < this.levels; i++) {
    for (var j = 0; j < this.slotsPerLevel; j++) {
      this.slots[i][j] = true; // Each slot is empty in the beginning.
    }
  }
  this.vehicles = [];

  this.AddVehicle('X-123', 'Car');
  this.AddVehicle('Y-321', 'Motorbike');
};

ParkingCtrl.prototype.LevelLabels = function() {
  var result = [];
  for (var i = 0; i < this.levels; i++) {
    result.push("Level " + (i + 1));
  }
  return result;
};

ParkingCtrl.prototype.AddVehicle = function(plate, type) {
  for (var i = 0; i < this.levels; i++) {
    for (var j = 0; j < this.slotsPerLevel; j++) {
      if (this.slots[i][j]) {
        this.slots[i][j] = false;
        var vehicle = {"plate": plate, "type": type, "level": i, "slot": j};
        this.vehicles.push(vehicle);
        return;
      }
    }
  }
  this.ShowError("No free slots");
};

ParkingCtrl.prototype.ShowError = function(message) {
  alert(message);
};

parkingApp.controller('ParkingCtrl', ParkingCtrl);
