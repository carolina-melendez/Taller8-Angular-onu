import { Component, OnInit } from '@angular/core';
import { PaisesApiService } from 'src/app/services/paises-api.service';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //definiendo variables
  paisesList:any[]=[];
  constructor(
    private paisesApiService: PaisesApiService,
    private router: Router,
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
            
            
          };
        });
        console.log(this.paisesList)
      },
      error: (error) => {},
      complete: () => {},
    });
  }
}
