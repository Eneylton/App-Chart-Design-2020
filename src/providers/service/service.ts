import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ServiceProvider {
  serve: string = 'http://192.168.100.19/Servidor-Geo/';

  constructor(public http: Http) { }

  postData(body,file){
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type});
    let options = new RequestOptions({ headers:headers});

    return this.http.post(this.serve + file,
           JSON.stringify(body),options).map(res => res.json());
  }

}