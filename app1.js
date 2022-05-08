(function (angular) {
var myApp = angular.module('QuanLySinhVien',[]);

	myApp.controller('DSLop',ClassController);
	myApp.controller('DSSinhVien',StudentController);

	// controller danh sach lop
	function ClassController($scope) {
	}

	// controller danh sach sinh vien
	function StudentController($scope) {
		$scope.DSClass = {
		     availableOptions: [
		       {name: '11A',type:'Lop 11'},
		       {name: '11B',type:'Lop 11'},
		       {name: '12C',type:'Lop 12'}
		     ],
		     selectedOption: {name: '12C',type:'Lop 12'},
		     availableOptionsClass:[{id: '1',type:'Lop 11'},
		       {id: '2',type:'Lop 12'}],
		       selectedOptionClass: {id: '1',type:'Lop 11'}//This sets the default value of the select in the ui
		     };
		$scope.selectedClass = [
		     	{ name: '11A',type:'Lop 11'},
		     	{name: '11B',type:'Lop 11'},
		     	{name: '12C',type:'Lop 12'},
		     	{name: '12C',type:'Lop 12'}
		     ];

		 	//khoi tao mang student
		var DSStudent = [
				{name:'do an',age:'12',lop:'11A'},
				{name:'ngoc an',age:'12',lop:'11B'},
				{name:'tra my',age:'12',lop:'12C'},
				{name:'ta khoa',age:'12',lop:'12C'},
			];

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
				lop:''
			};
		var formEditClass = {
				name:'',
				type:''
			};
		var indexStudent = 1;
		var indexClassSL = 1;
		
		$scope.addStudent = function(form){
			$scope.form = {
			name:'',
			age:'',
			lop:''
		};
			form.lop = $scope.DSClass.selectedOption.name;
			$scope.DSStudent.push(form);
			alert("Add successfull!");
			$scope.setTab(1);
		}
		$scope.addClass = function (formClass) {
			// body...
			$scope.formClass = {
				name:'',
				type:''
		};
			formClass.type = $scope.DSClass.selectedOption.type;
			$scope.DSClass.availableOptions[$scope.DSClass.availableOptions.length] = formClass;
			alert("Add successfull!");
			//delete $scope.formClass;
			$scope.setTab(4);
		}

		$scope.addSelectedClass = function(classSelected){
			$scope.selectedClass.push(classSelected);
		}
		$scope.removeStudent = function (student) {
			// body...
			var index = $scope.DSStudent.indexOf(student);
			$scope.DSStudent.splice(index,1);
			alert("Delete successfull!");
		}
		$scope.removeClass = function(classSelect){
			var indexClass = $scope.DSStudent.indexOf(classSelect);
			$scope.DSClass.availableOptions.splice(indexClass,1);
			alert("Delete successfull!");
		}
		$scope.loadFormeditStudent = function (EditStudent,index){
			// formEditStudent = EditStudent;
			indexStudent = index; 
			formEditStudent.name = EditStudent.name;
			formEditStudent.age = EditStudent.age;
			//alert($scope.selectedClass[index].name);
			$scope.DSClass.selectedOption = $scope.selectedClass[index];
			//alert($scope.DSClass.selectedOption.name);
			formEditStudent.lop = $scope.DSClass.selectedOption.name;
		}
		$scope.loadFormeditClass = function (EditClass,index){
			// formEditStudent = EditStudent;
			indexClassSL = index; 
			formEditClass.name = EditClass.name;
			//alert($scope.selectedClass[indexClassSL].name);
			$scope.DSClass.selectedOption = $scope.DSClass.availableOptions[index];
			//alert($scope.DSClass.selectedOption.type);
			//alert(index);
			//alert($scope.DSClass.availableOptions[index].type);
			formEditClass.type = $scope.DSClass.availableOptions[index].type;
		}

		$scope.editStudent = function (student) {
			// body...

			var index = $scope.DSStudent.indexOf(student);
			 if(indexStudent > -1){
		          $scope.DSStudent[indexStudent].name = student.name; 
		          $scope.DSStudent[indexStudent].age = student.age; 
		          $scope.DSStudent[indexStudent].lop = $scope.DSClass.selectedOption.name; 
		        }
		     alert("Edit successfull!");
		     $scope.setTab(1);
		}
		$scope.editClass = function (classpick) {
			// body...

			//var index = $scope.DSClass.indexOf(classpick);
			 if(indexClassSL > -1){
		          $scope.DSClass.availableOptions[indexClassSL].name = classpick.name; 
		          $scope.DSClass.availableOptions[indexClassSL].type = $scope.DSClass.selectedOption.type; 
		        }
		     alert("Edit successfull!");
		     $scope.setTab(4);
		}
		//$scope.searchClass="11A";
			delete $scope.searchName;
			delete $scope.searchAge;
			delete $scope.searchClass;
		$scope.loadAllStudent = function(){
			
			delete $scope.searchName;
			delete $scope.searchAge;
			delete $scope.searchClass;
		}
		$scope.searchObj = function (name,age,classSt) {
			// body...
			if(name !='' && age !='' || classSt !=''){
				$scope.searchName = name;
				$scope.searchAge = age;
				$scope.searchClass = classSt;
			}
		}
		
		$scope.indexClassSL = indexClassSL;
		$scope.indexStudent = indexStudent;
		$scope.formEditStudent = formEditStudent;
		$scope.DSStudent = DSStudent;
		$scope.formEditClass = formEditClass;

		$scope.searchEXE = function(lopSt){
			var index = $scope.DSClass.availableOptions.indexOf({id: '1', name: '11A',type:'Lop 11'});
			 if(index > -1){
		          // $scope.DSStudent[indexStudent].name = student.name; 
		          // $scope.DSStudent[indexStudent].age = student.age; 
		          // $scope.DSStudent[indexStudent].lop = student.lop; 
		          alert($scope.DSClass.availableOptions[1]);
		          //alert("oke");
		        }else{
		        	alert(index);
		        }
		}
	}

	myApp.controller('TabController',['$scope',function ($scope) {
		// body...
		$scope.tab = 1;
			$scope.searchName = '';
			$scope.searchAge = '';
		$scope.setTab = function (newTab) {
			// body...
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
	}]);
})(window.angular);