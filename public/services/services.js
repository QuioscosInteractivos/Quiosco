(function(){
	// Nuevo módulo: nombre, arreglo de dependencias
	angular.module('dataFeed', [])
		// factory es una petición asincrona que devuelve un objeto
		// El método $http devuelve una promesa
		// $q es una libreria para trabajar con promisess
		.factory('categoriesRequest', ['$http', '$q', function($http, $q){

			function byCategory(feedCategory){
				
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
						.then(function(data){
							console.log(data.data);
							return data.data
						});
			}

			function getBuildingSchedule(inuBuildingId){
				// Se pide la info por medio de la libreria $http y devuelve la promesa
				return $http.get('/api/Kioscos/findCourse/' + inuBuildingId)
						// Se devuelven los datos cuando llegan
						.then(function(data){
							console.log('???');
							console.log(data.data);
							return data.data
						});
			}

			// Devuelve un objeto
			return {
				// Estos nombres son los ALIAS de las funciones contenidas aquí,
					// con estos nombres es que se pueden llamar las funciones
				getCategories: byCategory,
				getBuildingSchedule: getBuildingSchedule
			}
		}])

		.factory('coreConfig', ['$http', '$q', function($http, $q){

			function getCategories(){

				return $http.get('data/' + 'categories.json')
						.then(function(data){
							return data.data;
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
						.then(function(data){
							// Devolviendo la info que llega
							return data.data;
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