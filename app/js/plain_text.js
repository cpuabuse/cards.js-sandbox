	var app = angular.module("useApp", []);
	app.controller("useCtrl", function($scope, $http) {
		var nid = "1";
		$scope.doPost = function(rating) {
			console.log("yello");
			$http({
				url: 'use',
				method: "POST",
				data: {
					"card_id": nid,
					"rating" : rating									
				}
			}).then(function(response) {
				// Success
				$scope.refresh();
			}, 
			function(response) { // optional
					// failed
			});
		}
		$scope.refresh = function(){
			$http.get("use/card_id").then(function(resp) {
				nid = (resp.data);
				$scope.card_id = nid;
				$http.get("https://example.com/cards/admin/structure/eck/entity/cards/"+nid+"?_format=json").then(function(response) {
					$scope.hideAnswer=true;
					console.log($scope.showDetails);
					$scope.question = response.data.title[0].value ;
					$scope.answer = response.data.field_answer_text[0].value;	
				});	
			});
		}
		$scope.refresh();
	});