import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisesApiService } from 'src/app/services/paises-api.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  codigoPais:any;
  paisDetalle:any;


  constructor(
    private paisesApiService: PaisesApiService, private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.codigoPais=this.route.snapshot.paramMap.get('codigo');
    this.getDetallePais(this.codigoPais);
  }

  getDetallePais(codigoPais:any) {
    this.paisesApiService.obtenerDetallesPais(codigoPais)
    .subscribe({
      next:(resultado:any)=>{
        this.paisDetalle=resultado.map((pais:any)=>{
          return{
            codigoPais:pais.ccn3,
            nombrePais:pais.name.common,
            poblacion:pais.population,
            region:pais.region,
            subregion:pais.subregion,
            capital:pais.capital,
            fronteras:pais.borders,
            bandera:pais.flags.png
          }
        });
        console.log(this.paisDetalle);
      },
      error: (error) => {
      },
      complete: () => {
      }
    });
  }

}
