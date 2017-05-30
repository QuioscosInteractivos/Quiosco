(function(){
	// Module no lleva mas parámetros cuando se está invocando uno que ya existe.
	var app = angular.module('interactiveStand')

	// La inyección se hace con los nombres de cada cosa o función, en este caso el nombre de la factory en el módulo dataFeed
	// $scope parece que hace parte de la libreria ngRoute. Se inyecta para crear las cosas en la vista a la que pertenecen en vez de
		// aquí en el controlador
	.controller('directoryController', ['$scope', 'Utilities', 'categoriesRequest', 'userConfig', 'coreConfig', function($scope, Utilities, categoriesRequest, userConfig, coreConfig){
		var me = $scope;

		// Inicializando
		// Elementos de la miga de pan
		me.arBreadCrumb = [];
		// Unidades (menú)
		me.arAllUnits = [];
		// Unidades (menú)
		me.arUnits = [];
		// Dependencias de la unidad seleccionada
		me.arDependencies = [];
		// Propiedad con la que se ordena la tabla
		me.sbOrderProperty = 'DESCRIPTION';
		// Flag que determina si el orden es ascendente o descendente
		me.blReverseOrder = false;

		// Primer crumb
		me.arBreadCrumb.push({
			ID: null,
			DESCRIPTION: 'Unidades',
			SONS: me.arAllUnits
		});

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		categoriesRequest.getCategories('units').then(function(iarData){
			Utilities.ReplaceArrayItems(me.arUnits, iarData);
			Utilities.ReplaceArrayItems(me.arAllUnits, iarData);
		});
		
		// Muestra las opciones hijas de una selección en el menú.
		me.ShowSons = function(iobUnit){
			var nuId = iobUnit.ID,
				nuLastCrumb = 0;

			// Guardando el registro anterior en la miga de pan.
			me.arBreadCrumb.push(iobUnit);
			// Reinicia las propiedades usadas para ordenar
			me.OrderBy('DESCRIPTION', false);

			if(iobUnit.DEPENDENCIES){
				// Cuando se llega a las dependencias de una unidad
				Utilities.ReplaceArrayItems(me.arDependencies, iobUnit.DEPENDENCIES);
				// Se limpian las opciones del menú
				Utilities.ReplaceArrayItems(me.arUnits);

			} else {
				// Limpiando la vista de pensum
				Utilities.ReplaceArrayItems(me.arDependencies);

				if (!iobUnit.SONS || (iobUnit.SONS.length === 0)) {
					// Cuando no hay mas hijos en el menú
					nuId = Number(iobUnit.ID);

					if (isNaN(nuId)) {
						console.log('No es un ID válido');
						return;
					}

					categoriesRequest.getDependencies(nuId).then(function(iarData){
						// Agrega las dependencias de la unidad seleccionada
						Utilities.ReplaceArrayItems(me.arDependencies, iarData);
						// Se limpian las opciones del menú
						Utilities.ReplaceArrayItems(me.arUnits);

						nuLastCrumb = (me.arBreadCrumb.length - 1);
						me.arBreadCrumb[nuLastCrumb].DEPENDENCIES = iarData;
					});
				} else {
					// Cambia las opciones a desplegar
					Utilities.ReplaceArrayItems(me.arUnits, iobUnit.SONS);
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

		// Define las variables usadas para ordenar la tabla que contiene la información de dependencias.
		me.OrderBy = function(isbProperty, iblReverse){
			var me = this;

			if (typeof(iblReverse) === 'boolean') {
				// Toma ambos datos
				me.sbOrderProperty = isbProperty;
				me.blReverseOrder = iblReverse;

			} else {
				// Valida la propiedad actual para decidir el orden
				if (me.sbOrderProperty === isbProperty) {
					me.blReverseOrder = !me.blReverseOrder;

				} else {
					// Por defecto es de menor a mayor
					me.sbOrderProperty = isbProperty;
					me.blReverseOrder = false;
				}
			}
		}
	}])
})();