// dependencies: Well

var ListOfWells = function() {
  this.wells = [];
  this.wellsIndex = {};
  this.selectedWell = null;
  this.editableFields = ['QC_AutoDepth', 'QC_MajorOperation'];
};

ListOfWells.prototype.all = ListOfWells.prototype.getAll = function() {
  return this.wells;
};

ListOfWells.prototype.addWell = function(well) {
  this.wells.push(well);
  this.wellsIndex[well.UWI] = well;

  this.selectedWell = this.selectedWell || well;

  return well;
};

ListOfWells.prototype.selectNextWell = function() {
  this.wellsIndex = this.wells.indexOf(this.selectedWell);
  if (this.wellsIndex + 1 < this.wells.length - 1) {
    this.selectedWell = this.wells[++this.wellsIndex];
  }

  return this;
};

ListOfWells.prototype.selectPreviousWell = function() {
  this.wellsIndex = this.wells.indexOf(this.selectedWell);
  if (this.wellsIndex > 0) {
    this.selectedWell = this.wells[--this.wellsIndex];
  }

  return this;
};

ListOfWells.prototype.getWell = function(wellName) {
  return this.wellsIndex[wellName];
};

ListOfWells.prototype.loadData = function(newData) {
  for (var i = 0; i < newData.length; i++) {
    var row = newData[i];
    var onWell = this.getWell(row.UWI) || this.addWell(new Well(row.UWI, row.Wellname, this));

    onWell.addDetails(row);
  }

  return this;
};
