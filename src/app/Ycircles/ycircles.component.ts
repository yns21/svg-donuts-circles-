import { Component, Input, OnInit } from '@angular/core';
import { Ycircle, StartPosition } from '../models/Ycircle';
@Component({
  selector: 'Ycircles',
  templateUrl: './ycircles.component.html',
  styleUrls: ['./ycircles.component.css']
})
export class YcirclesComponent implements OnInit {
  @Input() circles: Ycircle[] = [];
  // leave a gap between circles
  @Input() withGaps: boolean = false;
  //default  0deg
  @Input() startPosition: StartPosition = StartPosition.pos0;
  @Input() fixedRadius: boolean = true;
  @Input() typeRadius: string = "inner";
  @Input() size: number;
  ngOnInit() {
    this.PushCricles();
  }

  private PushCricles() {

    for (let i = 0; i < this.circles.length; i++) {

      if (this.fixedRadius) {
        this.circles[i].SetRadius(Math.max(...this.circles.map(o => o.thickness), 0), this.typeRadius);
      }
      // position the first element according to the start position
      if (i == 0) {
        this.circles[i].SetStroke_dashoffset(this.calculateOffset(this.startPosition));
      } else {

        if (this.withGaps) {
          if (i == 1) {

            // remove 1 in the end of the frist circle
            this.circles[0].perc -= 1;

          }
          // dont remove gap if there is juste a one circle
          if (i >= 1) {

            this.circles[i].perc -= 1;

          }
          this.circles[i].SetStroke_dashoffset(
            this.circles[i - 1].stroke_dashoffset / this.circles[i - 1].perimeter - (this.circles[i - 1].perc + 1) / 100);

        }
        else {
          this.circles[i].SetStroke_dashoffset(
            this.circles[i - 1].stroke_dashoffset / this.circles[i - 1].perimeter - (this.circles[i - 1].perc) / 100);

        }
      }
    }

  }
  private calculateOffset(position: StartPosition = null): number {
    switch (position) {
      case StartPosition.pos0: { return 0; break; }
      case StartPosition.pos90: { return 25 / 100; break; }
      case StartPosition.pos180: { return 50 / 100; break; }
      case StartPosition.pos270: { return 75 / 100; break; }

    }

  }
}