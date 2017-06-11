import { Injectable } from '@angular/core';
import { Http } from "@angular/http/";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FindCourseService {

  constructor(private Http: Http) {}

  sbBaseURL: String = "http://localhost/QuioscoUSB/services/";

  getBuildings(){
    let sbUrl = "Index/buildings";

    // Petición
    return this.SendRequest(sbUrl);
  }

// Consultar la programación de un auditorio
  getAuditoriums(inuId){
    let sbUrl = "Index/auditoriums?inuId="+inuId;

    return this.SendRequest(sbUrl);
  }

  getCourses(isbSearhString){
    let sbUrl = "Index/courses?isbSearhString="+isbSearhString;

    return this.SendRequest(sbUrl);
  }

   getBy(isbField, iobValue){
    let sbUrl = "Index/auditorios/"+iobValue;

    // Petición
    return this.SendRequest(sbUrl);
  }

  SendRequest(isbUrl){
    let sbUrl = this.sbBaseURL+isbUrl;

    // Petición
    return this.Http.get(sbUrl).toPromise()
        .then(iobData => iobData.json());
  }
}