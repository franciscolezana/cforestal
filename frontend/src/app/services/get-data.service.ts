import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GetDataService {


  constructor( private http: HttpClient) { }

  getData(){
    
    return this.http.get(`${URL}/actividades`);
  }
}
