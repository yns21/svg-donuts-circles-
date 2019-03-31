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
  thickness = 20;
  size = "350";
  circles: Ycircle[] = [
    // perc ; thickness ; color
    // this colors are not used ,instead a radial gradient is applied 
    // you can change it in ycircle html component at stroke circle's value
    new Ycircle(50, 10, "#ff0303"),
    new Ycircle(15, 20, "blue"),
    new Ycircle(10, 15, "#37ff00"),
    new Ycircle(5, 10, "#15ffc5")

  ]

}



