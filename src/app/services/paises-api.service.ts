import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesApiService {

  constructor(private httpClient: HttpClient) { }

  obtenerPaises(){
    let urlBase='https://restcountries.com/v3.1/all';
    return this.httpClient.get(urlBase)
    .pipe(
      map((resultados:any) => {
        return resultados;
      })
    );
    
  }
}
