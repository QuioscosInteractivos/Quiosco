(function(){
	// Module no lleva mas parámetros cuando se está invocando uno que ya existe.
	var app = angular.module('interactiveStand')

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('pensumController', ['$scope', 'categoriesRequest', 'userConfig', 'coreConfig', function($scope, categoriesRequest, userConfig, coreConfig){
		var me = $scope;

		// Inicializando
		// Elementos de la miga de pan
		me.arBreadCrumb = [];
		// Elementos a mostrar en el menú
		me.arMenuFaculties = [];
		// Todos los elementos consultados
		me.arAllfaculties = [];

		obBaseBreadCrumb = {
			ID: null,
			NAME: 'Facultades',
			SONS: me.arAllfaculties
		};

		me.arBreadCrumb.push(obBaseBreadCrumb);

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		categoriesRequest.getCategories('faculties').then(function(iarData){
			me.ReplaceArrayItems(me.arAllfaculties, iarData);
			me.ReplaceArrayItems(me.arMenuFaculties, iarData);
		});

		me.blPensumView = false;
		
		me.ShowSons = function(iobfaculty){
			var me = this;

				// Guardando el registro anterior en la miga de pan.
				me.arBreadCrumb.push(iobfaculty);

			if (!iobfaculty.SONS || (iobfaculty.SONS.length === 0)) {
				nuId = iobfaculty.ID;

				categoriesRequest.getBuildingSchedule(nuId).then(function(iobData){
					me.buildingSchedule = iobData;
					me.blPensumView = true;
					me.ReplaceArrayItems(me.arMenuFaculties, null);
				});

			} else {
				// Cambia las opciones a desplegar
				me.ReplaceArrayItems(me.arMenuFaculties, iobfaculty.SONS);
			}
		},

		me.ReplaceArrayItems = function(iarMenuArray, iarNewData){
			// Limpiando el arreglo
			iarMenuArray.length = 0;
			// Agrega data solo si es enviada
			if (iarNewData) {
				// Cambiando las opciones
				iarMenuArray.push.apply(iarMenuArray, iarNewData);
			}
		},

		// inuIndex es el número de la iteración por la que va un elemento,
		//		no el indice real en el arreglo en el que esta (en otras palabras
		//		no va a conconrdar con la posición real si el arreglo ha sido filtrado).
		me.GoTo = function(inuIndex, iobCrumb){
			var me = this;
			// Cambiando las opciones del menú
			me.ReplaceArrayItems(me.arMenuFaculties, iobCrumb.SONS);
			// Borrando los crumbs que estan después del seleccionado
			me.arBreadCrumb.splice(inuIndex+1);

			console.log('BreadCrumb:');
			console.log(me.arBreadCrumb);
		}
	}])
})();