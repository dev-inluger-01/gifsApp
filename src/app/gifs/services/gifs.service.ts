import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interfaces/gifs.interface';

// Dice a angular que este donde este el servicio
// va a funcionar.  Nivel global de funcionamiento
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  

  // limit:number=10;

  // category: string =""

  private apiKey:string='HNY7vsQcTcsU1g1HTzk66YJLlcPTQPtg'

  private servicioURL: string = 'https://api.giphy.com/v1/gifs'

  
  private _historial: string[]=[];

  public resultados: Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){

    // el constructor ejecuta una sola vez cuando el servciio es llamado.
    // Por eso es el lugar ideal para cargar del local storage.  El localstorage tiene
    // una capacidad maxima de 50MB

    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }
    // o tambien en una sola linea
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query:string){
    

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // validacion para que sean maximo 10


      // el localstorage solo graba string.  por eso se usa el json stringly para
      // convertirlo a cadena
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    // Este es el metodo de angular para especificar los parametros de la conexion http
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', '10')
      .set('q',query);

      console.log(params.toString());



    //const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&limit=${this.limit}&q=${query}`;

    // el tipo de respuesta luce como la interfaz SearchGifResponse
    this.http.get<SearchGifResponse>(`${this.servicioURL}/search`,{params})
      .subscribe((resp)=>{
        console.log(resp)
        this.resultados=resp.data;
        // Hace persistentes los resultados para que cargue las ultimas imagenes
        // cuando se refresca el navegador
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      });
     
  }
}
