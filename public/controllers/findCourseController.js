(function(){
	// Module no lleva mas parámetros cuando se está invocando uno que ya existe.
	var app = angular.module('interactiveStand')

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('findCourseController', ['$scope', 'categoriesRequest', 'userConfig', 'coreConfig', function($scope, categoriesRequest, userConfig, coreConfig){
		var me = $scope;

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		categoriesRequest.getCategories('buildings').then(function(data){
			me.buildings = data;
		});

		me.blScheduleView = false;
		
		me.FilterSons = function(inuId){
			categoriesRequest.getBuildingSchedule(inuId).then(function(iobData){
				me.buildingSchedule = iobData;
				me.blScheduleView = true;
			});
		}
	}])
})();