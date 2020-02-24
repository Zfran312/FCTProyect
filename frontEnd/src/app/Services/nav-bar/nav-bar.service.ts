import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class NavbarService {
  visible: boolean;

  constructor(private _location: Location) { this.visible = false; }

  //Ocultar la barra del menú
  hide() { this.visible = false; }

  //Mostrar la barra del menú
  show() { this.visible = true; }

  //Volver a la página anterior.
  returnBack(){ this._location.back() }

}
