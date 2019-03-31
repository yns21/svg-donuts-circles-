import { Component, Input, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
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
    this.update();

  }

  private update() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].perc$.subscribe(percentage => {
        console.log("---------", percentage);

        if (this.withGaps) {
          // if (i == 1) {

          //   // remove 1 in the end of the frist circle
          //   this.circles[0].SetPerc(this.circles[0].perc - 1, false);


          // }
          // // dont remove gap if there is juste a one circle
          // if (i >= 1) {

            //dont change it if the value is not changed 
          if (this.circles[i].perc != percentage)
            this.circles[i].SetPerc(this.circles[i].perc - 1, false);


          //}
          // update  position of the element  and who is next if he exist
          if (i > 0)

            this.circles[i].SetStroke_dashoffset(
              this.circles[i - 1].stroke_dashoffset / this.circles[i - 1].perimeter - (this.circles[i - 1].perc + 1) / 100);
      // notify the next one that his stroke offset must be change because the perc of the previous element is changed
      // here we emit the same value to dont:
          if ((i + 1) < this.circles.length)
            this.circles[i+1].perc$.next( this.circles[i+1].perc);

        }
        else {
          this.circles[i].SetStroke_dashoffset(
            this.circles[i - 1].stroke_dashoffset / this.circles[i - 1].perimeter - (this.circles[i - 1].perc) / 100);

        }

      });
    }
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
            this.circles[0].SetPerc(this.circles[0].perc - 1, false);


          }
          // dont remove gap if there is juste a one circle
          if (i >= 1) {

            this.circles[i].SetPerc(this.circles[i].perc - 1, false);

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