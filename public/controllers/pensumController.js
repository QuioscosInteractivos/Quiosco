(function(){
	// Module no lleva mas parámetros cuando se está invocando uno que ya existe.
	var app = angular.module('interactiveStand')

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('pensumController', ['$scope', 'categoriesRequest', 'carrersRequest', 'userConfig', 'coreConfig', function($scope, categoriesRequest, carrersRequest, userConfig, coreConfig){
		var me = $scope;

		// Inicializando
		// Elementos de la miga de pan
		me.arBreadCrumb = [];
		// Elementos a mostrar en el menú
		me.arMenuFaculties = [];
		// Todos los elementos consultados
		me.arAllfaculties = [];
		// Pensum de una carrera seleccionada
		me.arPensum = [];

		// Primer crumb
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
		
		me.ShowSons = function(iobfaculty){
			var me = this,
				nuLastCrumb = 0;

			if(iobfaculty.SEMESTERS){
				me.arBreadCrumb.push(iobfaculty);
				// Cuando se llega al pensum de una carrera
				me.ReplaceArrayItems(me.arPensum, [iobfaculty]);
				// Se limpian las opciones del menú
				me.ReplaceArrayItems(me.arMenuFaculties);

			} else {
				// Guardando el registro anterior en la miga de pan.
				me.arBreadCrumb.push(iobfaculty);
				// Limpiando la vista de pensum
				me.ReplaceArrayItems(me.arPensum);

				if (!iobfaculty.SONS || (iobfaculty.SONS.length === 0)) {
					// Cuando no hay mas hijos en el menú
					nuId = Number(iobfaculty.ID);

					if (isNaN(nuId)) {
						console.log('No es un ID válido');
						return;
					}

					carrersRequest.getCarrers(nuId).then(function(iobData){
						nuLastCrumb = (me.arBreadCrumb.length - 1);
						me.arBreadCrumb[nuLastCrumb].SONS = iobData;
						// Agregando la data al arreglo con todo
						//me.AddArrayItems(me.arAllfaculties, iobData);
						// Cambiando las opciones a desplegar
						me.ReplaceArrayItems(me.arMenuFaculties, iobData);
					});

				} else {
					// Cambia las opciones a desplegar
					me.ReplaceArrayItems(me.arMenuFaculties, iobfaculty.SONS);
				}
			}
		},

		// Reemplaza los datos de un arreglo con los de otro.
		me.ReplaceArrayItems = function(iarMenuArray, iarNewData){
			// Limpiando el arreglo
			iarMenuArray.length = 0;

			// Cambiando las opciones
			me.AddArrayItems(iarMenuArray, iarNewData);
		},

		// Agrega datos de un arreglo a otro.
		me.AddArrayItems = function(iarArray, iarData){
			// Agrega data solo si es enviada
			if (iarData) {
				iarArray.push.apply(iarArray, iarData);
			}
		},

		// inuIndex es el número de la iteración por la que va un elemento,
		//		no el indice real en el arreglo en el que esta (en otras palabras
		//		no va a conconrdar con la posición real si el arreglo ha sido filtrado).
		me.GoTo = function(inuIndex, iobCrumb){
			var me = this,
				obCrumb = null;
			// Cambiando las opciones del menú
			//me.ReplaceArrayItems(me.arMenuFaculties, iobCrumb.SONS);
			// Borrando los crumbs que estan después del seleccionado
			me.arBreadCrumb.splice(inuIndex+1);
			obCrumb = me.arBreadCrumb.pop();

			me.ShowSons(obCrumb);

			/*console.log('BreadCrumb:');
			console.log(me.arBreadCrumb);*/
		}
	}])
})();