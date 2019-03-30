import { Component } from '@angular/core';
import { Ycircle } from './models/Ycircle';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  perc = 10;
  thickness = 40;
  size = "350px";
  circles: Ycircle[] = [
    // perc ; thickness ; color
    new Ycircle(this.perc, this.thickness, "#ff0303"),
    new Ycircle(this.perc, this.thickness, "blue"),
    new Ycircle(this.perc, this.thickness, "#37ff00"),
    new Ycircle(this.perc, this.thickness, "#15ffc5"),
    new Ycircle(this.perc, this.thickness, "rgba(1,250,5,0.7)"),
    new Ycircle(this.perc, this.thickness, "#eee"),
    new Ycircle(this.perc, this.thickness, "#ff0303"),
    new Ycircle(this.perc, this.thickness, "#ff00d0"),
    new Ycircle(this.perc, this.thickness, "#37ff00"),
    new Ycircle(this.perc, this.thickness, "rgba(0,150,120,0.7)"),



  ]

}



