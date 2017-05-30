(function(){
	// Nuevo módulo: nombre, arreglo de dependencias
	angular.module('dataFeed', [])
		// factory es una petición asincrona que devuelve un objeto
		// El método $http devuelve una promesa
		// $q es una libreria para trabajar con promisess
		.factory('categoriesRequest', ['$http', '$q', function($http, $q){

			function getCategories(feedCategory){
				
				var sbURL = '';
				if (feedCategory === 'buildings') {
					sbURL = 'findCourse/';

				} else if (feedCategory === 'faculties') {
					sbURL = 'pensum/';

				} else if (feedCategory === 'units') {
					sbURL = 'directory/';
				}

				// Se pide la info por medio de la libreria $http y devuelve la promesa
				return $http.get('/api/Kioscos/' + sbURL)
						// Se devuelven los datos cuando llegan
						.then(function(iobData){
							return iobData.data
						});
			}

			function getBuildingSchedule(inuBuildingId){
				// Se pide la info por medio de la libreria $http y devuelve la promesa
				return $http.get('/api/Kioscos/findCourse/' + inuBuildingId)
						// Se devuelven los datos cuando llegan
						.then(function(iobData){
							return iobData.data
						});
			}

			function getDependencies(inuDependencyId){
				console.log(inuDependencyId);
				// Se pide la info por medio de la libreria $http y devuelve la promesa
				return $http.get('/api/Kioscos/directory/' + inuDependencyId)
						// Se devuelven los datos cuando llegan
						.then(function(iobData){
							return iobData.data
						});
			}

			// Devuelve un objeto
			return {
				// Estos nombres son los ALIAS de las funciones contenidas aquí,
					// con estos nombres es que se pueden llamar las funciones
				getCategories: getCategories,
				getBuildingSchedule: getBuildingSchedule,
				getDependencies: getDependencies
			}
		}])

		.factory('carrersRequest', ['$http', '$q', function($http, $q){

			function getCarrers(inuID){
				return $http.get('/api/Kioscos/pensum/' + inuID)
						// Se devuelven los datos cuando llegan
						.then(function(iobData){
							return iobData.data
						});
			}

			return {
				// Estos nombres son los ALIAS de las funciones contenidas aquí,
					// con estos nombres es que se pueden llamar las funciones
				getCarrers: getCarrers
			}
		}])

		.factory('coreConfig', ['$http', '$q', function($http, $q){

			function getCategories(){

				return $http.get('data/' + 'categories.json')
						.then(function(iobData){
							return iobData.data;
						});
			}

			return {
				getCategories: getCategories
			}
		}])

		// Data de celdas
		.factory('userConfig', ['$http', '$q', function($http, $q){

			function getCells(inuUserId){				
				var fileName = '';
				// Cuando se tengan los usuarios se deberia de hacer algo con su id para saber que llamar
				//if (inuUserId === 1) {
					fileName = 'userCells.json';
				//}

				// Se pide la info por medio de la libreria $http y se devuelve la promesa
				return $http.get('data/' + fileName)
						.then(function(iobData){
							// Devolviendo la info que llega
							return iobData.data;
						});

				// La función getCells devuelve la promesa cuando es resuelta
			}

			// Devuelve un objeto
			return {
				// Estos nombres son los ALIAS de las funciones contenidas aquí,
					// con estos nombres es que e pueden llamar las funciones
				getCells: getCells
			}
		}]);
})();