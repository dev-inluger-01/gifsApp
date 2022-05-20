import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  constructor(private gifsService:GifsService){

  }

  // ! es el non nun assertion operator
  // es para decir que el elemento existe y no es nulo
  // es propio de typescript
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; 

buscar(){

  
  const valor=this.txtBuscar.nativeElement.value;

  if (valor.trim().length===0){
    return
  }
  this.gifsService.buscarGifs(valor);

  this.txtBuscar.nativeElement.value="";
  //this.txtBuscar.nativeElement.placeholder="Buscar Gifs";
  
}

}
