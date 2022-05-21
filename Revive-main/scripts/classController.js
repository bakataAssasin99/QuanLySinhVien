app.classCtrl = function($scope,$location,$routeParams){
    $scope.namemmm = $routeParams.name;
  $scope.parentClassEditID = $routeParams.parentClassID;
  $scope.parentClassEdit;
  
  for (var j = 0; j < $scope.ListClass.length; j++) {
    if (($scope.ListClass[j].id ==$scope.parentClassEditID)) {
      $scope.parentClassEdit = $scope.ListClass[j].name;
      break;
    }
  }
  $scope.indexClassPickEdit = $routeParams.indexx;
  

  $scope.objEditClass;
  $scope.parentClass = '';
  $scope.indexClassEdit = '';
  $scope.nameClass;
  
  $scope.editClass = function (className) {
    var indexx = '';
    if ($scope.indexClassPickEdit > -1) {
      $scope.ListClass[$scope.indexClassPickEdit].name = className;
      if($scope.parentClass == '' || $scope.parentClass == undefined){
        $location.path('/class');
        return;
      }
      var parentClassEdit = $scope.parentClass.split('-');
      for (var i = 0; i < $scope.ListClass.length; i++) {
        if ($scope.ListClass[i].name.includes(parentClassEdit[parentClassEdit.length - 1])) {
          indexx = i;
          break;
        }
      }
      var prefix = '';
      $scope.ListClass[$scope.indexClassPickEdit].parentID = $scope.ListClass[indexx].id;
      $scope.ListClass[$scope.indexClassPickEdit].level = $scope.ListClass[indexx].level + 1;
      for (var j = 0; j < $scope.ListClass[indexx].level; j++) {
        prefix += '-';
      }
      $scope.ListClass[$scope.indexClassPickEdit].prefix = prefix;
    }
    $location.path('/class');
  }

  $scope.addClass = function (name, grade) {
    var objClass = {
      id: '',
      name: '',
      parentID: '',
      prefix: '',
      oderNumber: '',
      parent: '',
      level: ''
    }
    if (grade == '' || grade == undefined) {
      objClass.id = $scope.ListClass.length + 1;
      objClass.name = name;
      objClass.parentID = 0;
      objClass.prefix = '';
      objClass.parent = true;
      objClass.level = 1;

      $scope.ListClass.push(objClass);
      $location.path('/class');
      return;
    }
    var indexClass = '';
    if (!grade.includes('-')) {
      for (var index = 0; index < $scope.ListClass.length; index++) {
        if ($scope.ListClass[index].name.includes(grade)) {
          indexClass = index;
          break;
        }
      }
      if (indexClass >= 0) {
        objClass.id = $scope.ListClass.length + 1;
        objClass.name = name;
        objClass.parentID = $scope.ListClass[indexClass].id;
        objClass.level = $scope.ListClass[indexClass].level + 1;
        objClass.parent = false;
        $scope.ListClass[indexClass].parent = true;
        var prefix = '';
        for (var i = 0; i < $scope.ListClass[indexClass].level; i++) {
          prefix += '-';
        }
        objClass.prefix = prefix;
        $scope.ListClass.splice(indexClass + 1, 0, objClass);

      }
      $location.path('/class');
      return;
    }
    var gradeSplit = grade.split('-');

    for (let index = 0; index < $scope.ListClass.length; index++) {
      if ($scope.ListClass[index].name.includes(gradeSplit[gradeSplit.length - 1])) {
        indexClass = index;
        break;
      }
    }
    if (indexClass > 0) {
      objClass.id = $scope.ListClass.length + 1;
      objClass.name = name;
      objClass.parentID = $scope.ListClass[indexClass].id;
      objClass.level = $scope.ListClass[indexClass].level + 1;
      objClass.parent = false;
      $scope.ListClass[indexClass].parent = true;
      var prefix = '';
      for (var i = 0; i < $scope.ListClass[indexClass].level; i++) {
        prefix += '-';
      }
      objClass.prefix = prefix;
      $scope.ListClass.splice(indexClass + 1, 0, objClass);
      $location.path('/class');
    }
  };
}