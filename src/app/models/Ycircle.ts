
import { BehaviorSubject } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";



export class Ycircle {

  /** params: percentage, thickness */
  constructor(perc: number, thickness: number, color: string) {
    this.SetPerc(perc, true);
    this.thickness = thickness;
    this.color = color;
  }

  //------------------------------parameters---------------------------
  // percentage (0-100%)
  private _perc;

  perc$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  color: string = "black";
  // stroke  must be <= 50%
  private _thickness: number;
  set thickness(value) {
    if (value <= 50) this._thickness = value *45/50;
    else this._thickness = 45;
  }
  get thickness() { return this._thickness; }
  get perc(): number {
    return this._perc;
  }
set perc(value){
 this.SetPerc(value,true);
}

  public SetPerc(value: number, next: boolean) {

    this._perc = value;
    if (next) this.perc$.next(value);
    console.log(value);
  }
  //------------------------------internal logic---------------------------

  private radius: number;
  private _stroke_dashOffset: number;

  get perimeter(): number {
    return Math.round(Math.PI * this.radius * 2);
  }
  get stroke_dashoffset(): number { return this._stroke_dashOffset }

  private get stroke_dasharray() {

    if(this.perc <= 0) 
    return " 0 100";
    
    return "" + this.perc * this.perimeter / 100 + "% " + (this.perimeter / 100 * (100 - this.perc)) + "%";
  }

  public SetStroke_dashoffset(offest: number) {
    this._stroke_dashOffset = this.perimeter * offest;
  }

  public SetRadius(maxThickness: number, type: string) {

    //  outer
    if (type == "outer")
      this.radius = (90 + this.thickness - 2 * maxThickness) / 2;
    // inner
    if (type == "inner")
      this.radius = (90 - this.thickness) / 2;
    //middle
    if (type == "middle")
      this.radius = (90 - maxThickness) / 2;
  }
}
export enum StartPosition { pos0, pos90, pos180, pos270 }