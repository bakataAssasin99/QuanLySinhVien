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
      templateUrl: '/partials/tabAddStudent.html',
      controller:'studentManagement'
    })

    .when('/editStudent/:indexStudentEdit', {
      templateUrl: '/partials/tabEdittStudents.html',
      controller:'studentManagement'
    })

    .when('/class', {
      templateUrl: '/partials/tabClass.html'
    })

    .when('/addClass', {
      templateUrl: '/partials/tabAddClass.html',
      controller:'classManagement'
    })

    .when('/editClass/:name/:parentClassID/:indexx', {
      templateUrl: '/partials/tabEditClass.html',
      controller: 'classManagement'
    })

});



app.controller('studentManagement', function ($scope, $location,$routeParams,$filter) {

  app.studentCtrl($scope, $location,$routeParams,$filter);

  

});

app.controller('classManagement', function ($scope, $location,$routeParams) {
  
  app.classCtrl($scope, $location,$routeParams);
  
});

app.controller('controllerMNStudentClass', function ($scope, $location,$routeParams) {
 
  app.studentManagementCtrl($scope, $location,$routeParams);
  
});