(function(){
	var app = angular.module('interactiveStand', [
		// Aquí se define por nombre de módulos
		'ngRoute',
		'dataFeed'
		])

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('mainController', ['$scope', 'categoriesRequest', 'userConfig', 'coreConfig', function($scope, categoriesRequest, userConfig, coreConfig){
		var me = $scope;

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		categoriesRequest.getCategories('buildings').then(function(data){
			me.buildings = data;
		});
	}])

	// Controlador de los tabs, se le inyecta directamente objetos de ngRoute, así que los nombres de los parámetros
		// de entrada no pueden cambiar (la inyección es con el nombre).
	.controller('routeController', function($scope, $route, $routeParams, $location) {
	    $scope.$route = $route;
	    $scope.$location = $location;
	    $scope.$routeParams = $routeParams;

	    // Se inicializa que tab debe verse activo
	    if ($location.$$path == '/') {
	    	$scope.tab = 1;

	    } else if ($location.$$path == '/news') {
	    	$scope.tab = 1;

	    } else if ($location.$$path == '/pensum') {
	    	$scope.tab = 2;

	    } else if ($location.$$path == '/findCourse') {
	    	$scope.tab = 3;

	    }  else if ($location.$$path == '/directory') {
	    	$scope.tab = 4;

	    } else if ($location.$$path == '/map') {
	    	$scope.tab = 5;
	    }

	    // Esta función se puede llamar directamente desde la vista, está definida en la vista
	    // Cambia el valor de la variable tab que define que pestaña se vé activa
	    $scope.changeTab = function(tabIndex){
	    	$scope.tab = tabIndex;
	    }
	})

// Usando el módulo proveedor de ruta $routeProvider
	// Se le inyecta el $routeProvider como parámetro a la función
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'views/news.html',
				controller: 'mainController'
			})
			.when('/pensum', {
				templateUrl: 'views/pensum.html',
				controller: 'mainController'
			})
			.when('/findCourse', {
				templateUrl: 'views/findCourse.html',
				controller: 'mainController'
			})
			.when('/directory', {
				templateUrl: 'views/directory.html',
				controller: 'mainController'
			})
			.when('/map', {
				templateUrl: 'views/map.html',
				controller: 'mainController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
})();