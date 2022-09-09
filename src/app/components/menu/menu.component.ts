import { Component, OnInit } from '@angular/core';
import { PaisesApiService } from 'src/app/services/paises-api.service';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
//Filtro
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //definiendo variables
  paisesList:any[]=[];
  //definiendo variables para el filtrado
  paisesFiltrados: any;
  buscadorPais: any = this.fb.control('');
  selectPais: any = this.fb.control(null);
  regiones:any;

  constructor(
    private paisesApiService: PaisesApiService,
    private router: Router,
    //se usa para el filtro
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPaisesList();
  }

  getPaisesList(){
    this.paisesApiService.obtenerPaises().subscribe({
      next:(resultado:any) => {
        this.paisesList=resultado.map((pais:any) => {
          return {
            codigoPais:pais.ccn3,
            nombrePais: pais.name.common,
            bandera: pais.flags.png,
            region: pais.region,
            capital:pais.capital,
            poblacion:pais.population
          };
        });
        console.log(this.paisesList)
        this.paisesFiltrados = this.paisesList;
        this.regiones = [
          ...new Set(resultado.map((result: any) => result.region)),
        ];

      },
      error: (error) => {},
      complete: () => {},
    });
  }

  filtro(filtro: string) {
    const valor = filtro.toLowerCase();
    this.paisesFiltrados =
      this.selectPais.value === null
        ? this.paisesList.filter((e: any) =>
            e.nombrePais.toLowerCase().includes(valor)
          )
        : this.paisesList.filter(
            (e: any) =>
              e.nombrePais.toLowerCase().includes(valor) &&
              e.region.toLowerCase() === this.selectPais.value.toLowerCase()
          );
  }

  filtroPorRegion(filtro: string) {
    const valor = filtro ? filtro.toLowerCase() : '';
    //console.log(!filtro);
    if (filtro) {
      this.paisesFiltrados =
        this.buscadorPais.value !== ''
          ? this.paisesList.filter(
              (e: any) =>
                e.region.toLowerCase() === valor &&
                e.nombrePais
                  .toLowerCase()
                  .includes(this.buscadorPais.value.toLowerCase())
            )
          : this.paisesList.filter(
              (e: any) => e.region.toLowerCase() === valor
            );
    } else if (this.buscadorPais.value !== '') {
      this.paisesFiltrados = this.paisesList.filter((e: any) =>
        e.nombrePaiss
          .toLowerCase()
          .includes(this.buscadorPais.value.toLowerCase())
      );
    } else {
      this.paisesFiltrados = this.paisesList;
    }
  }
}
