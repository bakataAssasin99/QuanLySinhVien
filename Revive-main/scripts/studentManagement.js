app.studentManagementCtrl = function($scope, $location,$routeParams){
    $scope.moveTabEditClass = function (objCLass, index) {
        $scope.indexClassEdit = index;
       $scope.objEditClass = objCLass;
       $scope.nameClass = objCLass.name;
       if($scope.objEditClass.parentID == 0){
        $scope.parentClass = '';
       }else{
        for (var i = 0; i < $scope.ListClass.length; i++) {
          if ($scope.ListClass[i].id == $scope.objEditClass.parentID) {
            $scope.parentClass = $scope.ListClass[i].name;
            break;
          }
        }
      }
        $scope.nameaa = '1';
        return;
      }
    
      $scope.moveTabClass = function () {
        $location.path('/class');
        return;
      }
    
      $scope.moveTabAddClass = function () {
        $location.path('/addClass');
        return;
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
    
      $scope.ListStudent = [
      ];
    
      for (var i = 0; i < 100; i++) {
        var student = { id: (i + 1), name: 'Nguyen van ' + i, age: 22, lop: 'Lop 12B', grade: '12',idClass:9, birthdate: new Date() };
        $scope.ListStudent.push(student);
      }
    
     
      $scope.moveTabStudent = function () {
        $location.path('/student');
        return;
      }
      $scope.moveTabAddStudent = function () {
        $location.path('/addStudent');
        return;
      }
      
      $scope.objEditStudent;
      $scope.indexStudentEdit = '';
      $scope.moveTabEditStudent = function (objStudent, index) {
        $scope.indexStudentEdit = index;
        $scope.objEditStudent = objStudent;
        $location.path('/editStudent');
        return;
      }
      
    
      
      $scope.removeStudent = function (student) {
        // body...
        var index = $scope.ListStudent.indexOf(student);
        $scope.ListStudent.splice(index, 1);
      }
    
    
      
    
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
        alert(indexClass+1);
        var indexx = indexClass+1;
        var k =0;
        while(k<$scope.ListStudent.length){
          if($scope.ListStudent[k].idClass == indexx){
            $scope.ListStudent.splice(k,1);
          }else{
            k++;
          }
        }
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
    
}
  