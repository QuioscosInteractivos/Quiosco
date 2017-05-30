(function(){
	// Nuevo módulo: nombre, arreglo de dependencias
	angular.module('UtilitiesModule', [])

	.factory('Utilities', [ function(){
		// Reemplaza los datos de un arreglo con los de otro.
		function ReplaceArrayItems (iarMenuArray, iarNewData){
			// Limpiando el arreglo
			iarMenuArray.length = 0;

			// Cambiando las opciones
			this.AddArrayItems(iarMenuArray, iarNewData);
		}

		// Agrega datos de un arreglo a otro.
		function AddArrayItems (iarArray, iarData){
			// Agrega data solo si es enviada
			if (iarData) {
				iarArray.push.apply(iarArray, iarData);
			}
		}

		return {
			ReplaceArrayItems: ReplaceArrayItems,
			AddArrayItems: AddArrayItems
		}
	}]);
})();