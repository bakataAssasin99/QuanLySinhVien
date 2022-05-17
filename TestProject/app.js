(function (angular) {
var myApp = angular.module('StudentManagement',['angularUtils.directives.dirPagination']);
	myApp.controller('mdClass',ClassController);
	myApp.controller('mdStudent',StudentController);

	function ClassController($scope) {}

	function StudentController($scope) {

		$scope.ListClass = {
			availableOptions: [
			{name: '11',type:'11'},
			{name: '11A',type:'11'},
			{name: '11B',type:'11'},
			{name: '12',type:'12'},
			{name: '12C',type:'12'}
			],
			selectedOption: {name: '',type:''},
			availableOptionsClass:[{id: '1',type:'11'},
			{id: '2',type:'12'}],
			selectedOptionClass: {id: '1',type:'11'},
			availableOptionsGrade: [
			{id: '1',type:'11'},
			{id: '2',type:'11A'},
			{id:'3',type:'11B'},
			{id:'4',type:'12'},
			{id:'5',type:'12C'}
			],
			selectedOptionGrade: {id: '1',type:'11'}
		};
		
		var selectedClass = [];

	 	var ListStudent = [];

	 	for(var i=0;i<100;i++){
	 		var student = {id:(i+1),name:'Nguyen van ' + i,age:22,lop:'12C',grade:'12',birthdate: new Date("12/01/2022")};
	 		ListStudent.push(student);
	 		var classs = { name: '12C',type:'12'};
	 		selectedClass.push(classs);
	 	}

		var formEditStudent = {
			name:'',
			age:'',
			lop:'',
			grade:'',
			birthdate:''
		};
		var formEditClass = {
			name:'',
			type:''
		};
		var indexStudent = 1;
		var indexClassSL = 1;


		$scope.search = {};
		$scope.userInput = {};

	 	$scope.addStudent = function(form){
			$scope.form = {
				id:'',
				name:'',
				age:'',
				lop:'',
				grade:'',
				birthdate:''
			};
			form.id = $scope.ListStudent.length+1;
			form.birthdate = form.age;
			form.age = new Date().getFullYear() - form.birthdate.getFullYear();
			form.lop = $scope.ListClass.selectedOption.name;
			form.grade = $scope.ListClass.selectedOption.type;
			$scope.ListStudent.push(form);
			$scope.setTab('tabStudent');
		}

		$scope.removeStudent = function (student) {
			// body...
			var index = $scope.ListStudent.indexOf(student);
			$scope.ListStudent.splice(index,1);
		}

		$scope.loadFormeditStudent = function (EditStudent){
			indexStudent = EditStudent.id; 
			formEditStudent.name = EditStudent.name;
			formEditStudent.age = EditStudent.age;
			$scope.ListClass.selectedOption = $scope.selectedClass[indexStudent-1];
			formEditStudent.lop = $scope.ListClass.selectedOption.name;
			formEditStudent.grade = $scope.ListClass.selectedOption.type;
			formEditStudent.birthdate = EditStudent.birthdate;
		}

		$scope.editStudent = function (student) {

			// body...
			var index = $scope.ListStudent.indexOf(student);
			if(indexStudent > -1){
				$scope.ListStudent[indexStudent].name = student.name; 
				$scope.ListStudent[indexStudent-1].age = new Date().getFullYear() - student.birthdate.getFullYear() ; 
				$scope.ListStudent[indexStudent-1].lop = $scope.ListClass.selectedOption.name; 
				$scope.ListStudent[indexStudent-1].grade = $scope.ListClass.selectedOption.type;
				$scope.selectedClass[indexStudent-1].name =  $scope.ListStudent[indexStudent-1].lop;
				$scope.selectedClass[indexStudent-1].type =  $scope.ListStudent[indexStudent-1].grade;
				$scope.ListStudent[indexStudent-1].birthdate = student.birthdate; 
			}
			$scope.setTab('tabStudent');
		}

		$scope.loadAllStudent = function(){
			delete $scope.searchGrade;
			delete $scope.searchBirth;
			delete $scope.searchClass;
			delete $scope.search;
		}

		$scope.searchObjStudent = function (name,age,classSt,gradeSt,birth) {
			// body...
			if(classSt !=''){
				$scope.searchClass = classSt;
			}
			if(gradeSt !=''){
				$scope.searchGrade = $scope.ListClass.selectedOptionClass.type;
			}
			if(birth != ''){
				$scope.searchBirth = birth;
			}
			if(name !="" ||age!=""){
				for(prop in $scope.userInput) {
					$scope.search[prop] = $scope.userInput[prop];
				}
			}
		}
		
		$scope.addClass = function (formClass) {
			// body...
			$scope.formClass = {
				name:'',
				type:''
			};
			formClass.type = $scope.ListClass.selectedOption.name;
			$scope.ListClass.availableOptions[$scope.ListClass.availableOptions.length] = formClass;
			$scope.setTab('tabClass');
		}
		$scope.addSelectedClass = function(classSelected){
			$scope.selectedClass.push(classSelected);
		}
		
		$scope.removeClass = function(classSelect){
			var indexClass = $scope.ListStudent.indexOf(classSelect);
			$scope.ListClass.availableOptions.splice(indexClass,1);
		}
		
		$scope.loadFormeditClass = function (EditClass,index){
			indexClassSL = index; 
			formEditClass.name = EditClass.name;
			$scope.ListClass.selectedOption = $scope.ListClass.availableOptions[index];
			formEditClass.type = $scope.ListClass.availableOptions[index].type;
		}
		
		$scope.editClass = function (classpick) {
			if(indexClassSL > -1){
				$scope.ListClass.availableOptions[indexClassSL].name = classpick.name; 
				$scope.ListClass.availableOptions[indexClassSL].type = $scope.ListClass.selectedOption.type; 
			}
			$scope.setTab('tabClass');
		}

		delete $scope.searchName;
		delete $scope.searchAge;
		delete $scope.searchClass;
		delete $scope.searchGrade;

		$scope.indexClassSL = indexClassSL;
		$scope.indexStudent = indexStudent;
		$scope.formEditStudent = formEditStudent;
		$scope.ListStudent = ListStudent;
		$scope.selectedClass = selectedClass;
		$scope.formEditClass = formEditClass;

		$scope.searchEXE = function(lopSt){
			var index = $scope.ListClass.availableOptions.indexOf({id: '1', name: '11A',type:'Lop 11'});
		  
		}

		$scope.click = function(){
	 		$scope.formClass = {
	 			name:'',
	 			type:''
	 		};
	 	}
	}

		//controller tab
		myApp.controller('TabController',['$scope',function ($scope) {
		
		$scope.tab = 'tabStudent';			
		$scope.setTab = function (newTab) {
			// body...
			$scope.tab = newTab;

			if($scope.tab=='tabStudent'){ 
				$scope.show = true; 
			} else {
				$scope.show = false;
			}
		};
		$scope.isSet = function(tabName){
			return $scope.tab === tabName;
		};
	}]);

})(window.angular);
