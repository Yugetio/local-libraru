angular.module("authorsListApp", []).controller("authorsListCtrl", function($scope){
			$scope.list = model;
			$scope.newData = [];

			$scope.author = [];
			$scope.author3 = [];

			$scope.editFormShow = false;
			$scope.view = 0;

			var ind = 0;
			var i = window.localStorage["count"] ? window.localStorage["count"] : 0;
			
			$scope.forDate = function (arg) {
				var dateLab = new Date(arg);
				return dateLab.setDate(dateLab.getDate());
			}

			if ($scope.list && i === 0) {
				for (var j = 0; j < $scope.list.length; j++) {
					window.localStorage.setItem(i, JSON.stringify($scope.list[j]));
					i++;
       		window.localStorage.setItem("count", i);
				}
			}

			if (window.localStorage["count"]) { 
        for (var j = 0; j < window.localStorage["count"]; j++) {
        	if (!window.localStorage[j]) {continue;}
        	$scope.newData.push(JSON.parse(window.localStorage.getItem(j)));
        }
      }

			$scope.addNewAuthor = function(author){
				$scope.newData.push({
					name: author.authorName,
					date: author.authorDate,
					books: author.authorBooks,
					style: author.authorStyle,
					pages: author.authorPages
				});

				window.localStorage.setItem(i, JSON.stringify($scope.newData[i]));
       	i++;
       	window.localStorage.setItem("count", i);

				author.authorName = "";
				author.authorDate = "";
				author.authorBooks = "";
				author.authorStyle = "";
				author.authorPages = "";
				$scope.showBlock(0);
			} 

			$scope.showBlock = function(arg){
				$scope.view = arg;
			}

			$scope.deleteAuthor = function (arg) {
				var arr = [];
				
				window.localStorage.removeItem(arg);
				$scope.newData.splice(arg, 1);
				
				for (var j = 0; j < i; j++) {
					if (!window.localStorage[j]) {continue;}
					arr.push(window.localStorage[j]);
				}

				window.localStorage.clear();
				window.localStorage.setItem("count", arr.length);
				for (var j = 0; j < arr.length; j++) {
					window.localStorage.setItem(j, arr[j]);
				}
			}

			$scope.editThisAuthor = function(arg){
				ind = arg;
				$scope.editFormShow = true;
				
				$scope.author3.editName = $scope.newData[arg].name;
				$scope.author3.editDate = new Date($scope.newData[arg].date);
				$scope.author3.editBooks = $scope.newData[arg].books;
				$scope.author3.editStyle = $scope.newData[arg].style;
				$scope.author3.editPages = $scope.newData[arg].pages;
				}

			$scope.editAuthor = function (arg) {	
				$scope.editFormShow = false;
				var tempObj = {
					name: arg.editName,
					date: arg.editDate,
					books: arg.editBooks,
					style: arg.editStyle,
					pages: arg.editPages
				};

				window.localStorage.setItem(ind, JSON.stringify(tempObj));
				$scope.newData[ind] = tempObj;
			}

			$scope.cancel = function(){
				$scope.editFormShow = false;
			}

			$scope.ncs = false;
			$scope.btnSearch = function() {
				$("table tbody tr").show();
				$("table tbody tr:not(table tr:contains(" + $('#inputSearch').val() + "))").hide(500);
				$scope.ncs = true;
			}

			$scope.btnCancSearch = function(){
				$("table tbody tr").show(500);
				$('#inputSearch').val("");
				$scope.ncs = false;
			}

			$scope.blockIn = function (e) {
				if (e.charCode < 48 || e.charCode > 57) {
						e.preventDefault();
				}
			}

			$scope.GoSearch = function (e) {
				if (e.charCode === 13) {
						$scope.btnSearch();
				}
			}
});