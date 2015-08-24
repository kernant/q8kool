var Well = function(uwi, wellName, parent) {
  this.UWI = uwi;
  this.wellName = wellName;
  this.details = [];

  if (parent) {
    this.parent = parent;
  }
};

Well.prototype.addDetails = function(detail) {
  this.details.push(detail);

  return this;
};

Well.prototype.export = function() {
  console.log("Exporting "+this.UWI,this);

  return this;
};

Well.prototype.buildGraphData = function() {
  console.log("Building graph data...");
  var transformed = _.map(this.details, function(row) {
    return [new Date(row.StartTime), row.QC_AutoDepth];
  });
  console.log("transformed data",transformed);

  return [{
    key:  'Depth',
    values: transformed
  }];
};

Well.prototype.getScatterData = function(y, group) {
  var transformed = _.map(this.details, function(row) {
    // if x and y targets exist in detail row, return chartable point
    if (!_.isUndefined(row.StartTime) && !_.isUndefined(row[y]) && (!group || !_.isUndefined(row[group]))) {
      var transformedNode = { x: new Date(row.StartTime), y: row[y] };

      if (group && row[group]) {
        transformedNode.group = row[group];
      }

      return transformedNode;
    }

    // else return false
    return null;
  });

  // compact results
  transformed = _.compact(transformed);

  if (!group) {
    return [{ key: y, values: transformed }];
  }

  var groups = _.uniq(_.pluck(transformed, 'group'));

  var groupedData = [];

  _.each(groups, function(groupName) {
    groupedData.push({
      key: groupName,
      values: _.where(transformed, { group: groupName })
    });
  });

  return groupedData;
};

Well.prototype.getParent = function() {
  return this.parent;
};
