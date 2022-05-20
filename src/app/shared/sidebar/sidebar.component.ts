import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Gif } from '../../gifs/interfaces/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){

  }

  // Esta enlazado a la propiedad historial del componente sidebar 
  get historial(){
    return this.gifsService.historial;
  }

  // en el servicio buscarGifs cambia el historial, el cual retorna a traves del get de arriba
  buscar(item:string){
    this.gifsService.buscarGifs(item);
  }
}
