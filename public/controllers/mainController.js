(function(){
	// Module lleva los parámetros cuando está creandose uno nuevo.
	var app = angular.module('interactiveStand', [
		// Aquí se define por nombre de módulos
		'ngRoute',
		'dataFeed'
		])

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
				controller: 'pensumController'
			})
			.when('/findCourse', {
				templateUrl: 'views/findCourse.html',
				controller: 'findCourseController'
			})
			.when('/directory', {
				templateUrl: 'views/directory.html',
				controller: 'directoryController'
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