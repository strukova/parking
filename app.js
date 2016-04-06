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
  this.dialogVisible = false;
  this.carsFilter = false;
  this.motorbikesFilter = false;
  this.vehicles = [];
};

ParkingCtrl.prototype.LevelLabels = function() {
  var result = [];
  for (var i = 0; i < this.levels; i++) {
    result.push("Level " + i);
  }
  return result;
};

ParkingCtrl.prototype.AddVehicle = function() {
  if (this.vehiclePlate == "") {
    this.ShowError('You must specify vehicle plate');
    return;
  }
  if (this.vehicleType != "Car" && this.vehicleType != "Motorbike") {
    this.ShowError('Invalid vehicle type');
    return;
  }
  for (var i = 0; i < this.levels; i++) {
    for (var j = 0; j < this.slotsPerLevel; j++) {
      if (this.slots[i][j]) {
        this.slots[i][j] = false;
        var vehicle = {"plate": this.vehiclePlate, "type": this.vehicleType, "level": i, "slot": j};
        this.vehicles.push(vehicle);
        this.HideDialog();
        return;
      }
    }
  }
  this.ShowError("No free slots");
};

ParkingCtrl.prototype.ShowDialog = function() {
  this.vehicleType = 'Car';
  this.vehiclePlate = '';
  this.dialogVisible = true;
};

ParkingCtrl.prototype.HideDialog = function() {
  this.dialogVisible = false;
};

ParkingCtrl.prototype.ShowError = function(message) {
  alert(message);
};

// Returns true if the given vehicle matches current type filter.
ParkingCtrl.prototype.TypeFilter = function(vehicle) {
  if (!this.carsFilter && !this.motorbikesFilter) {
    return true;
  }
  if (this.carsFilter && vehicle.type == "Car") {
    return true;
  }
  if (this.motorbikesFilter && vehicle.type == "Motorbike") {
    return true;
  }
  return false;
};

ParkingCtrl.prototype.FilteredVehicles = function() {
  var result = [];
  for (var i = 0; i < this.vehicles.length; i++) {
    if (this.TypeFilter(this.vehicles[i])) {
      result.push(this.vehicles[i]);
    }
  }
  return result;
};

parkingApp.controller('ParkingCtrl', ParkingCtrl);
