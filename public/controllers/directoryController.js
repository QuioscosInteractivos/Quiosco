(function(){
	// Module no lleva mas parámetros cuando se está invocando uno que ya existe.
	var app = angular.module('interactiveStand')

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('directoryController', ['$scope', 'categoriesRequest', 'userConfig', 'coreConfig', function($scope, categoriesRequest, userConfig, coreConfig){
		var me = $scope;

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		categoriesRequest.getCategories('units').then(function(data){
			me.units = data;
		});

		me.blDependencyView = false;
		
		me.FilterSons = function(inuId){
			console.log('Viendo hijos');
			console.log(inuId);

			categoriesRequest.getBuildingSchedule(inuId).then(function(iobData){
				me.buildingSchedule = iobData;
				me.blDependencyView = true;
			});
		}
	}])
})();