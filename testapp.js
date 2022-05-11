(function (angular) {
var myApp = angular.module('QuanLySinhVien',['angularUtils.directives.dirPagination']);
	myApp.controller('DSLop',ClassController);
	myApp.controller('DSSinhVien',StudentController);
	// controller danh sach lop
	function ClassController($scope) {}
	// controller danh sach sinh vien
	function StudentController($scope) {
		$scope.DSClass = {
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
		 	//khoi tao mang student
		 	var DSStudent = [];
		 	for(var i=0;i<100;i++){
		 		var student = {id:(i+1),name:'Nguyen van ' + i,age:22,lop:'12C',grade:'12',birthdate: new Date("12/01/2000")};
		 		DSStudent.push(student);
		 		var classs = { name: '12C',type:'12'};
		 		selectedClass.push(classs);
		 	}
	 	$scope.click = function(){
	 		$scope.formClass = {
	 			name:'',
	 			type:''
	 		};
	 	}
		// obj student form edit
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
		$scope.addStudent = function(form){
			$scope.form = {
				id:'',
				name:'',
				age:'',
				lop:'',
				grade:'',
				birthdate:''
			};
			form.id = $scope.DSStudent.length;
			form.birthdate = form.age;
			form.age = new Date().getFullYear() - form.birthdate.getFullYear();
			form.lop = $scope.DSClass.selectedOption.name;
			form.grade = $scope.DSClass.selectedOption.type;
			$scope.DSStudent.push(form);
			$scope.setTab(1);
		}
		$scope.addClass = function (formClass) {
			// body...
			$scope.formClass = {
				name:'',
				type:''
			};
			formClass.type = $scope.DSClass.selectedOption.name;
			$scope.DSClass.availableOptions[$scope.DSClass.availableOptions.length] = formClass;
			$scope.setTab(4);
		}
		$scope.addSelectedClass = function(classSelected){
			$scope.selectedClass.push(classSelected);
		}
		$scope.removeStudent = function (student) {
			// body...
			var index = $scope.DSStudent.indexOf(student);
			$scope.DSStudent.splice(index,1);
		}
		$scope.removeClass = function(classSelect){
			var indexClass = $scope.DSStudent.indexOf(classSelect);
			$scope.DSClass.availableOptions.splice(indexClass,1);
		}
		$scope.loadFormeditStudent = function (EditStudent){
			indexStudent = EditStudent.id; 
			formEditStudent.name = EditStudent.name;
			formEditStudent.age = EditStudent.age;
			$scope.DSClass.selectedOption = $scope.selectedClass[indexStudent];
			formEditStudent.lop = $scope.DSClass.selectedOption.name;
			formEditStudent.grade = $scope.DSClass.selectedOption.type;
		}
		$scope.loadFormeditClass = function (EditClass,index){
			indexClassSL = index; 
			formEditClass.name = EditClass.name;
			$scope.DSClass.selectedOption = $scope.DSClass.availableOptions[index];
			formEditClass.type = $scope.DSClass.availableOptions[index].type;
		}
		$scope.editStudent = function (student) {
			// body...
			var index = $scope.DSStudent.indexOf(student);
			if(indexStudent > -1){
				$scope.DSStudent[indexStudent-1].name = student.name; 
				$scope.DSStudent[indexStudent-1].age = student.age; 
				$scope.DSStudent[indexStudent-1].lop = $scope.DSClass.selectedOption.name; 
				$scope.DSStudent[indexStudent-1].grade = $scope.DSClass.selectedOption.type; 
			}
			$scope.setTab(1);
		}
		$scope.editClass = function (classpick) {
			if(indexClassSL > -1){
				$scope.DSClass.availableOptions[indexClassSL].name = classpick.name; 
				$scope.DSClass.availableOptions[indexClassSL].type = $scope.DSClass.selectedOption.type; 
			}
			$scope.setTab(4);
		}
		delete $scope.searchName;
		delete $scope.searchAge;
		delete $scope.searchClass;
		delete $scope.searchGrade;
		$scope.loadAllStudent = function(){
			delete $scope.searchGrade;
			delete $scope.searchClass;
			delete $scope.search;
		}
		$scope.search = {};
		$scope.userInput = {};
		$scope.searchObj = function (name,age,classSt,gradeSt) {
			// body...
			if(classSt !=''){
				$scope.searchClass = classSt;
			}
			if(gradeSt !=''){
				$scope.searchGrade = $scope.DSClass.selectedOptionClass.type;
			}
			if(name !="" ||age!=""){
				for(prop in $scope.userInput) {
					$scope.search[prop] = $scope.userInput[prop];
				}
			}
		}
		$scope.indexClassSL = indexClassSL;
		$scope.indexStudent = indexStudent;
		$scope.formEditStudent = formEditStudent;
		$scope.DSStudent = DSStudent;
		$scope.selectedClass = selectedClass;
		$scope.formEditClass = formEditClass;

		$scope.searchEXE = function(lopSt){
			var index = $scope.DSClass.availableOptions.indexOf({id: '1', name: '11A',type:'Lop 11'});
		  }
		}

		myApp.controller('TabController',['$scope',function ($scope) {
		// body...
		$scope.tab = 1;			
			$scope.setTab = function (newTab) {
			// body...
			$scope.tab = newTab;
			if($scope.tab==1) $scope.show = true; else $scope.show = false;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
	}]);
})(window.angular);