var app = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.config(function ($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: '/partials/tabStudent.html'
    })

    .when('/student', {
      templateUrl: '/partials/tabStudent.html'
    })

    .when('/addStudent', {
      templateUrl: '/partials/tabAddStudent.html'
    })

    .when('/editStudent', {
      templateUrl: '/partials/tabEdittStudents.html'
    })

    .when('/class', {
      templateUrl: '/partials/tabClass.html'
    })

    .when('/addClass', {
      templateUrl: '/partials/tabAddClass.html'
    })

    .when('/editClass', {
      templateUrl: '/partials/tabEditClass.html'
    })

});

app.controller('myController', function ($scope, $location) {
  var ListStudent = [];

  for (var i = 0; i < 100; i++) {
    var student = { id: (i + 1), name: 'Nguyen van ' + i, age: 22, lop: 'Lop 12B', grade: '12', birthdate: new Date("12/01/2022") };
    ListStudent.push(student);
  }

  $scope.ListClass = [
    { id: 1, name: 'Lop 11', parentID: 0, oderNumber: 0, prefix: '', parent: true, level: 1 },
    { id: 2, name: 'Lop 11A', parentID: 1, oderNumber: 1, prefix: '-', parent: false, level: 2 },
    { id: 3, name: 'Lop 11A1', parentID: 2, oderNumber: 3, prefix: '--', parent: false, level: 3 },
    { id: 4, name: 'Lop 11B', parentID: 1, oderNumber: 2, prefix: '-', parent: false, level: 2 },
    { id: 5, name: 'Lop 11C', parentID: 1, oderNumber: 4, prefix: '-', parent: false, level: 2 },
    { id: 6, name: 'Lop 12', parentID: 0, oderNumber: 5, prefix: '', parent: true, level: 1 },
    { id: 7, name: 'Lop 12A', parentID: 6, oderNumber: 3, prefix: '-', parent: false, level: 2 },
    { id: 8, name: 'Lop 12A1', parentID: 7, oderNumber: 3, prefix: '--', parent: false, level: 3 },
    { id: 9, name: 'Lop 12B', parentID: 6, oderNumber: 3, prefix: '-', parent: true, level: 2 },
    { id: 10, name: 'Lop 12B1', parentID: 9, oderNumber: 7, prefix: '--', parent: false, level: 3 }



  ];
  $scope.moveTabClass = function () {
    $location.path('/class');

  }
  $scope.moveTabStudent = function () {
    $location.path('/student');

  }
  $scope.moveTabAddStudent = function () {
    $location.path('/addStudent');

  }
  $scope.moveTabAddClass = function () {
    $location.path('/addClass');
  }
  $scope.objEditStudent;
  $scope.indexStudentEdit = '';
  $scope.moveTabEditStudent = function (objStudent, index) {
    $scope.indexStudentEdit = index;
    $scope.objEditStudent = objStudent;
    $location.path('/editStudent');

  }
  $scope.objEditClass;
  $scope.parentClass = '';
  $scope.indexClassEdit = '';

  $scope.moveTabEditClass = function (objCLass, index) {
    $scope.indexClassEdit = index;
    $scope.objEditClass = objCLass;
    for (var i = 0; i < $scope.ListClass.length; i++) {
      if ($scope.ListClass[i].id == $scope.objEditClass.parentID) {
        $scope.parentClass = $scope.ListClass[i].name;
        break;
      }
    }
    $location.path('/editClass');
  }
  $scope.editClass = function (className) {
    var indexx = '';
    if ($scope.indexClassEdit > -1) {
      $scope.ListClass[$scope.indexClassEdit].name = className;
      var parentClassEdit = $scope.parentClass.split('-');
      for (var i = 0; i < $scope.ListClass.length; i++) {
        if ($scope.ListClass[i].name.includes(parentClassEdit[parentClassEdit.length - 1])) {
          indexx = i;
          break;
        }
      }
      var prefix = '';
      $scope.ListClass[$scope.indexClassEdit].parentID = $scope.ListClass[indexx].id;
      $scope.ListClass[$scope.indexClassEdit].level = $scope.ListClass[indexx].level + 1;
      for (var j = 0; j < $scope.ListClass[indexx].level; j++) {
        prefix += '-';
      }
      $scope.ListClass[$scope.indexClassEdit].prefix = prefix;
    }
    $location.path('/class');
  }

  $scope.nameStudent = '';
  $scope.birthdateStudent;
  $scope.lopStudent = '';
  $scope.addStudent = function (name, birthdate, lop) {
    var form = {
      id: '',
      name: '',
      age: '',
      lop: '',
      grade: '',
      birthdate: ''
    };
    form.lop = lop;
    form.name = name;
    form.age = new Date().getFullYear() - birthdate.getFullYear();
    form.birthdate = birthdate;
    form.id = $scope.ListStudent.length + 1;

    form.grade = '';
    $scope.ListStudent.push(form);
    $location.path('/student');
  }
  $scope.removeStudent = function (student) {
    // body...
    var index = $scope.ListStudent.indexOf(student);
    $scope.ListStudent.splice(index, 1);
  }
  $scope.editStudent = function (name, age, lop) {

    // body...
    if ($scope.indexStudentEdit > -1) {
      var indexx = $scope.indexStudentEdit - 1;
      $scope.ListStudent[indexx].name = name;
      $scope.ListStudent[indexx].age = new Date().getFullYear() - $scope.objEditStudent.birthdate.getFullYear();
      $scope.ListStudent[indexx].lop = lop;
      $scope.ListStudent[indexx].birthdate = $scope.objEditStudent.birthdate;
    }
    $location.path('/student');
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

  $scope.ListClassOder = [];
  $scope.buidClass = function () {
    for (var i = 0; i < $scope.ListClass.length; i++) {
      if ($scope.ListClass.parent && listClass.parentID == 0) {
        $scope.ListClassOder.push($scope.ListClass[i]);
      } else {
        for (var j = 0; j < $scope.ListClassOder.length; j++) {
          if ($scope.ListClassOder[j].id == $scope.ListClass[i].parentID) {
            $scope.ListClassOder.splice(j + 1, 0, $scope.ListClass[i]);
            break;
          }
        }
      }
    }
  };

  $scope.search = {};
  $scope.userInput = {};
  $scope.searchObjStudent = function (name, age, lop) {
    if ($scope.search == undefined) {
      $scope.search = {};
    }
    if ($scope.userInput == undefined) {
      $scope.userInput = {};
    }
    // body...
    if (lop != '') {
      $scope.searchClass = lop;
    }
    if (name != "" || age != "") {
      for (prop in $scope.userInput) {
        $scope.search[prop] = $scope.userInput[prop];
      }
    }
  }
  $scope.loadAllStudent = function () {
    delete $scope.search;
    delete $scope.searchClass;
  }

  $scope.saveEditStudent = function () {
    $location.path('/student');
  }

  $scope.deleteStudent = function (student) {
    var index = $scope.students.indexOf(student);
    $scope.students.splice(index, 1);
  }

  $scope.saveEditClass = function () {
    $location.path('/class');
  }

  $scope.deleteClass = function (classroom) {
    var indexClass = $scope.ListClass.indexOf(classroom);
    $scope.ListClass.splice(indexClass, 1);
    var i = 0;
    while (i < $scope.ListClass.length) {
      var check = false;
      for (var j = 0; j < $scope.ListClass.length; j++) {
        if (($scope.ListClass[j].id == $scope.ListClass[i].parentID) || $scope.ListClass[i].parentID == 0) {
          check = true;
          break;
        }
      }
      if (check == false) {
        $scope.ListClass.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  $scope.ListStudent = ListStudent;
});