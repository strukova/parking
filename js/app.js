var parkingApp = angular.module("parkingApp", []);

var ParkingCtrl = function() {
  // Number of levels of our parking
  this.levels = 5;
  // Number of slots on every level of the parking
  this.slotsPerLevel = 5;
  // Two-dimentional array for keeping track of free slots
  // e.g. this.slots[3][5] contains true if 5th slot on 3rd level is free
  this.slots = new Array(this.levels);
  for (var i = 0; i < this.levels; i++) {
    this.slots[i] = new Array(this.slotsPerLevel);
  }
  // Each slot is marked as empty in the beginning
  for (var i = 0; i < this.levels; i++) {
    for (var j = 0; j < this.slotsPerLevel; j++) {
      this.slots[i][j] = true;
    }
  }
  // If true, the "Add vehicle" dialog is shown
  this.dialogVisible = false;
  // If true, the "Car" filter checkbox is checked
  this.carsFilter = false;
  // If true, the "Motorbike" filter checkbox is checked
  this.motorbikesFilter = false;
  // Value of the license plate search box
  this.plateFilter = "";
  // Values of level filter checkboxes
  this.levelFilter = new Array(this.levels);
  for (var i = 0; i < this.levels; i++) {
    this.levelFilter[i] = false;
  }
  // Array of all vehicles parked in our parking
  this.vehicles = [];
};

// Returns an array of level names
ParkingCtrl.prototype.LevelLabels = function() {
  var result = [];
  for (var i = 0; i < this.levels; i++) {
    result.push("Level " + i);
  }
  return result;
};

// Adds a new vehicle into the parking
ParkingCtrl.prototype.AddVehicle = function() {
  if (this.vehiclePlate == "") {
    this.ShowError("You must specify vehicle plate");
    return;
  }
  if (this.vehicleType != "Car" && this.vehicleType != "Motorbike") {
    this.ShowError("Invalid vehicle type");
    return;
  }
  for (var i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].plate == this.vehiclePlate) {
      this.ShowError("This vehicle is already parked");
      return;
    }
  }
  for (var i = 0; i < this.levels; i++) {
    for (var j = 0; j < this.slotsPerLevel; j++) {
      if (this.slots[i][j]) {
        this.slots[i][j] = false;
        var vehicle = {
          "plate": this.vehiclePlate,
          "type": this.vehicleType,
          "level": i,
          "slot": j
        };
        this.vehicles.push(vehicle);
        this.HideDialog();
        return;
      }
    }
  }
  this.ShowError("No free slots");
};

// Removes a vehicle from the parking
ParkingCtrl.prototype.RemoveVehicle = function(vehicle) {
  for (var i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].plate === vehicle.plate) {
      this.slots[this.vehicles[i].level][this.vehicles[i].slot] = true;
      this.vehicles.splice(i, 1);
    }
  }
}

// Shows dialog window
ParkingCtrl.prototype.ShowDialog = function() {
  this.vehicleType = "Car";
  this.vehiclePlate = "";
  this.dialogVisible = true;
};

// Hides dialog window
ParkingCtrl.prototype.HideDialog = function() {
  this.dialogVisible = false;
};

// Shows error message
ParkingCtrl.prototype.ShowError = function(message) {
  alert(message);
};

// Returns true if the given vehicle matches current type filter
ParkingCtrl.prototype.MatchesTypeFilter = function(vehicle) {
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

// Returns true if the given vehicle matches the plate filter
ParkingCtrl.prototype.MatchesPlateFilter = function(vehicle) {
  if (!this.plateFilter) {
    return true;
  }
  if (vehicle.plate.indexOf(this.plateFilter) != -1) {
    return true;
  }
  return false;
};

// Returns true if the given vehicle matches the level filter
ParkingCtrl.prototype.MatchesLevelFilter = function(vehicle) {
  var hasLevelFilter = false;
  for (var i = 0; i < this.levelFilter.length; i++) {
    if (this.levelFilter[i]) {
      hasLevelFilter = true;
    }
  }
  if (!hasLevelFilter) {
    return true;
  }
  return this.levelFilter[vehicle.level];
};

// Returns all vehicles that match all applied filters
ParkingCtrl.prototype.FilteredVehicles = function() {
  var result = [];
  for (var i = 0; i < this.vehicles.length; i++) {
    if (this.MatchesTypeFilter(this.vehicles[i]) &&
        this.MatchesPlateFilter(this.vehicles[i]) &&
        this.MatchesLevelFilter(this.vehicles[i])) {
      result.push(this.vehicles[i]);
    }
  }
  return result;
};

parkingApp.controller("ParkingCtrl", ParkingCtrl);
