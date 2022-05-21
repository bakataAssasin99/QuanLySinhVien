app.studentCtrl = function($scope, $location,$routeParams,$filter){
    $scope.indexStudentEdit = $routeParams.indexStudentEdit;
  $scope.nameStudentEdit = $scope.ListStudent[$scope.indexStudentEdit].name;

  $scope.birthStudentEdit = $scope.ListStudent[$scope.indexStudentEdit].birthdate;

  $scope.classStudentEdit =  $scope.ListStudent[$scope.indexStudentEdit].lop;

  

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
      idClass:'',
      birthdate: ''
    };
   
    form.lop = lop;
    if(!form.lop.includes('-')){
      for (let index = 0; index < $scope.ListClass.length; index++) {
        if ($scope.ListClass[index].name.includes(form.lop)) {
          form.idClass = $scope.ListClass[index].id;
          break;
        }
      }
  }else{
    //alert($scope.ListClass.length);
    var classPick = form.lop.split('-');
    for (let index = 0; index < $scope.ListClass.length; index++) {
      if ($scope.ListClass[index].name.includes(classPick[classPick.length - 1])) {
        form.idClass = $scope.ListClass[index].id;
        break;
      }
    }
  
  }
    form.name = name;
    form.age = new Date().getFullYear() - birthdate.getFullYear();
    form.birthdate = birthdate;
    form.id = $scope.ListStudent.length + 1;

    form.grade = '';
    $scope.ListStudent.push(form);
    $location.path('/student');
  }
  
  

  $scope.editStudent = function (name, age, lop) {
    if ($scope.indexStudentEdit > -1) {
      var indexx = $scope.indexStudentEdit ;
      $scope.ListStudent[indexx].name = name;
      $scope.ListStudent[indexx].age = new Date().getFullYear() - $scope.objEditStudent.birthdate.getFullYear();
      $scope.ListStudent[indexx].lop = lop;
      $scope.ListStudent[indexx].birthdate = $scope.objEditStudent.birthdate;

    }
    $location.path('/student');
  }
}