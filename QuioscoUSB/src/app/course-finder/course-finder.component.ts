import { Component, OnInit } from '@angular/core';
import { FindCourseService } from "app/services/find-course.service";

@Component({
  selector: 'app-course-finder',
  templateUrl: './course-finder.component.html',
  styleUrls: ['./course-finder.component.css']
})
export class CourseFinderComponent implements OnInit {

  constructor(private FindCourseService: FindCourseService) {}

    // Título de la vista
    sbTitle: any = 'Ubica tu clase';
    // Par´metro de búsqueda
    sbSearchString: String = '';
    // Receptor de peticiones
    iobData: any = [];
    arBreadCrumb: any = [];
		// Unidades (menú)
		arAllUnits: any = [];
		// Unidades (menú)
    arMenuOptions: any = [];
		// Dependencias de la unidad seleccionada
		arDependencies: any = [];
		// Propiedad con la que se ordena la tabla
		sbOrderProperty: any = 'DESCRIPTION';
		// Flag que determina si el orden es ascendente o descendente
		blReverseOrder: any = false;
  

  ngOnInit() {
    this.FindCourseService.getBuildings().then(
      iobData => {
          // Primer crumb
          /*this.arBreadCrumb.push();*/
          this.ShowSons({
            ID: null,
            DESCRIPTION: 'Edificios',
            SONS: iobData
          });
        }
      ).catch(
        sbError => {console.log(sbError)}
      );

      /*this.FindCourseService.getBy('ID_AUDIENCE', '4').then(
      iobData => {
          this.arMenuOptions = iobData;
        }
      ).catch(
        sbError => console.log(sbError)
      );*/
  }

  FilterSons() {
    console.log('sadasdsad');
  }

		// Se llama al método del servicio, recibe como entrada lo mismo con lo que resolvió la promesa
		/*categoriesRequest.getCategories('units').then(function(iarData){
      Utilities.ReplaceArrayItems(this.arMenuOptions, iarData);
			Utilities.ReplaceArrayItems(me.arAllUnits, iarData);
		});*/
		
		// Muestra las opciones hijas de una selección en el menú.
		ShowSons(iobCrumb) {
			/*var nuId = iobCrumb.ID,
				nuLastCrumb = 0;*/

			// Guardando el registro anterior en la miga de pan.
			this.arBreadCrumb.push(iobCrumb);
			// Reinicia las propiedades usadas para ordenar
			//this.OrderBy('DESCRIPTION', false);

      this.arMenuOptions = iobCrumb;
			
				// Limpiando la vista de pensum
				//Utilities.ReplaceArrayItems(this.arDependencies);

        if(!iobCrumb.SCHEDULE && !iobCrumb.SONS){
					// Cuando no hay mas hijos en el menú
					let nuId = Number(iobCrumb.ID);

          console.log(nuId);
					if (isNaN(nuId)) {
						console.log('No es un ID válido');
						return;
					}

          // Pedir los auditorios de un edificio (Vienen con su programación)
          this.FindCourseService.getAuditoriums(nuId).then(
              iobData => {
                // Guardando la información consultada en la selección
                iobCrumb.SCHEDULE = iobData;
            }
          ).catch(
            sbError => console.log(sbError)
          );
        }

					/*categoriesRequest.getDependencies(nuId).then(function(iarData){
						// Agrega las dependencias de la unidad seleccionada
						Utilities.ReplaceArrayItems(this.arDependencies, iarData);
						// Se limpian las opciones del menú
						Utilities.ReplaceArrayItems(this.arMenuOptions);

						nuLastCrumb = (this.arBreadCrumb.length - 1);
						this.arBreadCrumb[nuLastCrumb].DEPENDENCIES = iarData;
					});
					// Cambia las opciones a desplegar
					Utilities.ReplaceArrayItems(this.arMenuOptions, iobCrumb.SONS);*/

		}

		// inuIndex es el número de la iteración por la que va un elemento,
		//		no el indice real en el arreglo en el que esta (en otras palabras
		//		no va a conconrdar con la posición real si el arreglo ha sido filtrado).
		GoTo(inuIndex, iobCrumb){
			let me = this,
				  obCrumb = null;

			// Borrando los crumbs que estan después del seleccionado
			this.arBreadCrumb.splice(inuIndex+1);
			obCrumb = this.arBreadCrumb.pop();

			// Pide continuar con la lógica usual al seleccionar algo del menú
			this.ShowSons(obCrumb);
		}

    SearchCourse(){
      console.log(this.sbSearchString);

      this.FindCourseService.getCourses(this.sbSearchString).then(
        iobData => {
          // limpiando los breadcrumbs
          this.arBreadCrumb.length = 0;

          // Definiendo el nuevo inicio
          this.ShowSons({
            ID: null,
            DESCRIPTION: 'Resultados para "' + this.sbSearchString + '"' + 'Da errores al hacer click sobre uno!!!!',
            SONS: iobData
          });
        }
      ).catch(iobError => console.log(iobError))
    }

		// Define las variables usadas para ordenar la tabla que contiene la información de dependencias.
		/*OrderBy = function(isbProperty, iblReverse){
			var me = this;

			if (typeof(iblReverse) === 'boolean') {
				// Toma ambos datos
				this.sbOrderProperty = isbProperty;
				this.blReverseOrder = iblReverse;

			} else {
				// Valida la propiedad actual para decidir el orden
				if (this.sbOrderProperty === isbProperty) {
					this.blReverseOrder = !this.blReverseOrder;

				} else {
					// Por defecto es de menor a mayor
					this.sbOrderProperty = isbProperty;
					this.blReverseOrder = false;
				}
			}
    }*/
}
