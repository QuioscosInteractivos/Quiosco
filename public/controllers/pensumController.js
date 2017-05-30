(function(){
	// Module no lleva mas parámetros cuando se está invocando uno que ya existe.
	var app = angular.module('interactiveStand')

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('pensumController', ['$scope', 'Utilities', 'categoriesRequest', 'carrersRequest', 'userConfig', 'coreConfig', function($scope, Utilities, categoriesRequest, carrersRequest, userConfig, coreConfig){
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
		// Colores de las clases
		me.arCourseTypeClasses = ['blue', 'yellow', 'green', 'red'];
		me.obCourseClasses = {};

		// Primer crumb
		me.arBreadCrumb.push({
			ID: null,
			NAME: 'Facultades',
			SONS: me.arAllfaculties
		});

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		categoriesRequest.getCategories('faculties').then(function(iarData){
			Utilities.ReplaceArrayItems(me.arAllfaculties, iarData);
			Utilities.ReplaceArrayItems(me.arMenuFaculties, iarData);
		});
		
		me.ShowSons = function(iobfaculty){
			var me = this,
				nuLastCrumb = 0;

			if(iobfaculty.SEMESTERS){
				me.arBreadCrumb.push(iobfaculty);
				// Cuando se llega al pensum de una carrera
				Utilities.ReplaceArrayItems(me.arPensum, [iobfaculty]);
				// Se limpian las opciones del menú
				Utilities.ReplaceArrayItems(me.arMenuFaculties);

			} else {
				// Guardando el registro anterior en la miga de pan.
				me.arBreadCrumb.push(iobfaculty);
				// Limpiando la vista de pensum
				Utilities.ReplaceArrayItems(me.arPensum);

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
						// Cambiando las opciones a desplegar
						Utilities.ReplaceArrayItems(me.arMenuFaculties, iobData);
					});

				} else {
					// Cambia las opciones a desplegar
					Utilities.ReplaceArrayItems(me.arMenuFaculties, iobfaculty.SONS);
				}
			}
		},

		// inuIndex es el número de la iteración por la que va un elemento,
		//		no el indice real en el arreglo en el que esta (en otras palabras
		//		no va a conconrdar con la posición real si el arreglo ha sido filtrado).
		me.GoTo = function(inuIndex, iobCrumb){
			var me = this,
				obCrumb = null;

			// Borrando los crumbs que estan después del seleccionado
			me.arBreadCrumb.splice(inuIndex+1);
			obCrumb = me.arBreadCrumb.pop();

			// Pide continuar con la lógica usual al seleccionar algo del menú
			me.ShowSons(obCrumb);
		},

		// Devuelve la clase correspondiente a un tipo de curso.
		me.getCourseTypeColor = function(inuID){
			var me = this;

			if(!me.obCourseClasses[inuID]) {
				me.obCourseClasses[inuID] = me.arCourseTypeClasses.shift();
			}

			return me.obCourseClasses[inuID];
		},

		// Devuelve la suma de todos los créditos en un semestre.
		me.getTotalCredits = function(iobSemester) {
			var me = this,
				nuTotal = 0;

			for (var i = iobSemester.SUBJECTS.length - 1; i >= 0; i--) {
				nuTotal += iobSemester.SUBJECTS[i].CREDITS;
			}

			return nuTotal;
		}
	}])
})();